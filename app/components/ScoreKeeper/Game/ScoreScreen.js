import React from 'react';
import { connect } from 'react-redux'
import {RaisedButton} from 'material-ui'
import {Link} from 'react-router'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { checkForWinner, checkForLosers } from './gameFunctions'
import {resetScoresAction} from '../../../store'


const ScoreScreen = ({ players, handleReset }) => {
  console.log(players)
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
        <div>
        <Table className='scoreTable'>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
              <TableHeaderColumn>Wins</TableHeaderColumn>
            </TableRow>
          </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {players.map(player => {
              return (<TableRow key={player.id}>
                <TableRowColumn>{player.name}</TableRowColumn>
                <TableRowColumn>{player.score}</TableRowColumn>
                <TableRowColumn>{player.wins}</TableRowColumn>
              </TableRow>)
            })}
          </TableBody>
        </Table>
          <RaisedButton
            containerElement={<Link to="/addScores" />}
            label="yaniv!"
          />
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
