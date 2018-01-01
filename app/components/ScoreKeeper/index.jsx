import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import {connect} from 'react-redux'

import Rules from './Game/Rules'
import PlayerScreen from './Game/PlayerScreen'
import ScoreScreen from './Game/ScoreScreen'
import AddScoreScreen from './Game/AddScoreScreen'
import EditPlayerScreen from './Game/EditPlayerScreen'

const Index = ({ children, players }) => (
  <div className='screen'>
    <div className='spacer' />
    <div className='container'>
      {/*<button
        className='homeButton'>
        create game
      </button>*/}
      {players.length && <Link
      to='/rules'><button
        className='homeButton'>
        continue
      </button></Link>}
     <Link to='/new'><button
        className='homeButton'>
        new
        </button></Link>
    </div>
  </div>)

const mapState = (state) => ({
  players: state.players
})

const IndexContainer = connect(mapState)(Index)

export default <Route path="/game" component={({ children }) => children}>
  <IndexRoute component={IndexContainer} />
  <Route path="/new" component={Rules} />
  <Route path="/players" component={PlayerScreen} />
  <Route path="/scores" component={ScoreScreen} />
  <Route path="/addScores" component={AddScoreScreen} />
  <Route path="/edit/:playerId" component={EditPlayerScreen} />
</Route>
