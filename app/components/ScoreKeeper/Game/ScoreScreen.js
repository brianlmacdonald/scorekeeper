import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router'
import { checkForWinner, checkForLosers } from './gameFunctions'
import {resetScoresAction} from '../../../store'


const ScoreScreen = ({ players, handleReset }) => {
    checkForLosers(players)
    const winner = checkForWinner(players)
    if (winner) {
      return (
        <div>
          <h1 className="winnerH1">{`${winner.name} wins!`}</h1>
          <button
            className="homeButton"
            onClick={(evt) => {
              evt.preventDefault()
              handleReset()
            }}
          >
          reset?
          </button>
        </div>
      )

    } else {
      return (
        <div className="container">
        <table className="scoreTable">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Wins</th>
            </tr>
            {players.map(player => {
                return (<tr className="playerRow" key={player.id}>
                <td className="mobileCell"><Link to={`/edit/${player.id}`}>{player.name}</Link></td>
                <td className="mobileCell">{player.score}</td>
                <td className="mobileCell">{player.wins}</td>
              </tr>)
            })}
            </tbody>
        </table>
        <div className="buttonContainer">
          <Link to="/addScores"><button
          className="homeButton"
          >yaniv!</button></Link>
        </div>
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
