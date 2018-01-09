import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import {connect} from 'react-redux'

import Rules from './Game/Rules'
import PlayerScreen from './Game/PlayerScreen'
import ScoreScreen from './Game/ScoreScreen'
import AddScoreScreen from './Game/AddScoreScreen'
import EditPlayerScreen from './Game/EditPlayerScreen'
import TutorialScreen from './Game/Tutorial/TutorialScreen'

const Index = ({ children, players }) => {
  let ready = players.length !== 0
  return (
    <div className="screen">
      <div className="spacer" />
      <div className="container">
        <div className="imageHolder">
          <h1 className="homeScreenHeader">yaniv!</h1>
        </div>
        <div className="buttonContainer">
          <Link to="/tutorial/">
            <button
              className="homeButton">
              learn</button>
          </Link>
              {ready && <Link
              to="/scores"><button
              className="homeButton">
              continue
            </button></Link>}
          <Link to="/new">
            <button
              className="homeButton">
              new
            </button>
          </Link>
        </div>
      </div>
    </div>)}

const mapState = (state) => ({
  players: state.players
})

const IndexContainer = connect(mapState)(Index)

export default <Route path="/game" component={({ children }) => children}>
  <IndexRoute component={IndexContainer} />
  <Route path="/new" component={Rules} />
  <Route path="/players" component={PlayerScreen} />
  <Route path="/scores" component={AddScoreScreen} />
  <Route path="/edit/:playerId" component={EditPlayerScreen} />
  <Route path="/tutorial/*" component={TutorialScreen} />}
</Route>
