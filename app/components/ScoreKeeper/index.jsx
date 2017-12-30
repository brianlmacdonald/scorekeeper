import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import {loadContinueAction} from '../../store/index.js'
import {connect} from 'react-redux'

import Rules from './Game/Rules'
import PlayerScreen from './Game/PlayerScreen'
import ScoreScreen from './Game/ScoreScreen'
import AddScoreScreen from './Game/AddScoreScreen'
import EditPlayerScreen from './Game/EditPlayerScreen'
import firebase from 'APP/fire'
const db = firebase.database()

let gameState;

const Index = ({ children, handleContinue, checkGameState }) => (
  <div className='screen'>
    <div className='spacer' />
    <div className='container'>
      {/*<button
        className='homeButton'>
        create game
      </button>*/}
      <Link
      to={checkGameState}><button
        onClick={handleContinue}
        className='homeButton'>
        continue
      </button></Link>
     <Link to='/new'><button
        className='homeButton'>
        new
        </button></Link>
    </div>
  </div>)

const mapDispatch = (dispatch) => ({
  handleContinue(){
    gameState ? dispatch(loadContinueAction(gameState)) : console.log('no game found')
  },
  checkGameState(){
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.ref('users/' + user.uid)
          .child('game')
          .on('value', snapshot => {
            gameState = snapshot.val()
          })
      } else {
        gameState = JSON.parse(localStorage.getItem('game'))
      }
    });
    return gameState ? '/scores' : '/new'
  }
})

const IndexContainer = connect(null, mapDispatch)(Index)

export default <Route path="/game" component={({ children }) => children}>
  <IndexRoute component={IndexContainer} />
  <Route path="/new" component={Rules} />
  <Route path="/players" component={PlayerScreen} />
  <Route path="/scores" component={ScoreScreen} />
  <Route path="/addScores" component={AddScoreScreen} />
  <Route path="/edit/:playerId" component={EditPlayerScreen} />
</Route>
