import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'

import Rules from './Game/Rules'
import PlayerScreen from './Game/PlayerScreen'
import ScoreScreen from './Game/ScoreScreen'
import AddScoreScreen from './Game/AddScoreScreen'
import { FlatButton } from 'material-ui'

const Index = ({ children }) => (
  <div className='screen'>
    <div className='spacer' />
    <div className='container'>
      <button
        className='homeButton'>
        create game
      </button>
      <button
        className='homeButton'>
        all time
      </button>
      <a href='/new'><button
        className='homeButton'>
        scorekeeper
        </button></a>
    </div>
  </div>)

export default <Route path="/game" component={({ children }) => children}>
  <IndexRoute component={Index} />
  <Route path="/new" component={Rules} />
  <Route path="/players" component={PlayerScreen} />
  <Route path="/scores" component={ScoreScreen} />
  <Route path="/addScores" component={AddScoreScreen} />
</Route>
