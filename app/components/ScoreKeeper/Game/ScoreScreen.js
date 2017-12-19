import React from 'react';
import { connect } from 'react-redux'
import {RaisedButton} from 'material-ui'
import {Link} from 'react-router'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { checkForWinner, checkForLosers } from './gameFunctions'
import {resetScoresAction} from '../../../store'


const ScoreScreen = ({ players, handleReset }) => {
    checkForLosers(players)
    const winner = checkForWinner(players)
    if (winner) {
      return (
        <div>
          <h1>{`${winner.name} wins!`}</h1>
          <button
            onClick={(evt) => {
              evt.preventDefault()
              handleReset()
            }}
          >
          play again?
          </button>
        </div>
      )

    } else {
      return (
        <div className='container'>
        <table className='scoreTable'>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Wins</th>
            </tr>
            {players.map(player => {
              return (<tr className='playerRow' key={player.id}>
                <td>{player.name}</td>
                <td>{player.score}</td>
                <td>{player.wins}</td>
              </tr>)
            })}
            </tbody>
        </table>
          <Link to='/addScores'><button
          className='homeButton'
          >yaniv!</button></Link>
        </div>
      )
    }
}

const mapState = (state) => ({
  players: state.players,
  rules: state.rules
})

const mapDispatch = (dispatch) => ({
  handleReset(){
    dispatch(resetScoresAction())
  }
})

const ScoreScreenContainer = connect(mapState, mapDispatch)(ScoreScreen)
export default ScoreScreenContainer;
