import React from 'react';
import { connect } from 'react-redux'
import {RaisedButton} from 'material-ui'
import {Link} from 'react-router'



const ScoreScreen = ({ players }) => {
    return (
      <div>
        <div/>
        <h1 >game</h1>
        <div/>
        {players.map(player => {
          return (<div key={player.id}>
            <div >
              <h2 >{player.name}</h2>
            </div>
            <div/>
            <div>
              <h3>{player.score}</h3>
              <h4>{player.wins}</h4>
            </div>
          </div>)
        })}
        <RaisedButton
          containerElement={<Link to='/addScores' />}
          label='yaniv!'
        />
      </div>
    )
}

const mapStateToProps = (state) => ({
  players: state.players
})

const ScoreScreenContainer = connect(mapStateToProps)(ScoreScreen)
export default ScoreScreenContainer;
