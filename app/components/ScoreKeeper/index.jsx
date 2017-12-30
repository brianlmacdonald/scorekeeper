import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import {loadContinueAction} from '../../store/index.js'
import {connect} from 'react-redux'

import Rules from './Game/Rules'
import PlayerScreen from './Game/PlayerScreen'
import ScoreScreen from './Game/ScoreScreen'
import AddScoreScreen from './Game/AddScoreScreen'
import EditPlayerScreen from './Game/EditPlayerScreen'
import HowToPlayScreen from './Game/HowToPlayScreen'
import firebase from 'APP/fire'
const db = firebase.database()

const Index = ({ children, handleContinue }) => (
  <div className='screen'>
    <div className='spacer' />
    <div className='container'>
      <Link to='/scores'><button
        onClick={handleContinue}
        className='homeButton'>
        continue
      </button></Link>
     <Link to='/new'><button
        className='homeButton'>
        new
        </button></Link>
      <Link to='/howtoplay'>
        <button
          className='homeButton'
        >
          what?
        </button>
      </Link>
    </div>
  </div>)

  //todo: load game automatically, disable continue if nothing has been loaded.
  //todo: if a local game and saved game appear in conflict, offer user option to choose which one.
const mapDispatch = (dispatch) => ({
  handleContinue(){
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.ref('users/' + user.uid)
        .child('game')
        .on('value', snapshot => {
          dispatch(loadContinueAction(snapshot.val()))
        })
      } else {
        dispatch(loadContinueAction(JSON.parse(localStorage.getItem('game'))))
      }
    });
    
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
  <Route path='/howtoplay' component={HowToPlayScreen} />
</Route>
