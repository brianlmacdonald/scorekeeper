import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import {loadContinueAction} from '../../store/index.js'
import {connect} from 'react-redux'

import Rules from './Game/Rules'
import PlayerScreen from './Game/PlayerScreen'
import ScoreScreen from './Game/ScoreScreen'
import AddScoreScreen from './Game/AddScoreScreen'

const Index = ({ children, handleContinue }) => (
  <div className='screen'>
    <div className='spacer' />
    <div className='container'>
      {/*<button
        className='homeButton'>
        create game
      </button>*/}
      <Link to='/scores'><button
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
    dispatch(loadContinueAction(JSON.parse(localStorage.getItem('game'))))
  }
})

const IndexContainer = connect(null, mapDispatch)(Index)

export default <Route path="/game" component={({ children }) => children}>
  <IndexRoute component={IndexContainer} />
  <Route path="/new" component={Rules} />
  <Route path="/players" component={PlayerScreen} />
  <Route path="/scores" component={ScoreScreen} />
  <Route path="/addScores" component={AddScoreScreen} />
</Route>
