import React from 'react';
import { connect } from 'react-redux'
import {RaisedButton} from 'material-ui'
import {Link} from 'react-router'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const ScoreScreen = ({ players }) => {
  console.log(players)
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

const mapStateToProps = (state) => ({
  players: state.players
})

const ScoreScreenContainer = connect(mapStateToProps)(ScoreScreen)
export default ScoreScreenContainer;
