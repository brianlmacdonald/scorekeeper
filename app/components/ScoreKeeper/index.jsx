import React from 'react'
import { Route, IndexRedirect, IndexRoute, Link } from 'react-router'
import {connect} from 'react-redux'

import Rules from './Game/Rules'
import PlayerScreen from './Game/PlayerScreen'
import ScoreScreen from './Game/ScoreScreen'
import AddScoreScreen from './Game/AddScoreScreen'
import EditPlayerScreen from './Game/EditPlayerScreen'
import TutorialScreen from './Game/Tutorial/TutorialScreen'
import CardElement from './Game/Tutorial/CardElement'
const title = [
  {name: 'Y',
    suit: `\u2764`,
  }, {
    name: 'A',
    suit: `\u2660`,
  }, {
    name: 'N',
    suit: `\u2666`,
  }, {
    name: 'I',
    suit: `\u2663`
  }, {
    name: 'V',
    suit: `\uD83C\uDCCF`
  }
]

const Index = ({ children, players }) => {
  let ready = players.length !== 0
  let i = 55;
  return (
    <div id="screen">
      <div className="spacer" />
      <div className={'container makeColumn'}>
        <div className="cards">
          {title.map(letter => {
            i++
            return <div key={i} className="cardAnimation"><CardElement key={i} props={letter} /></div>
          })}
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

export default <Route path="/home" component={({ children }) => children}>
  <IndexRoute component={IndexContainer} />
  <Route path="/new" component={Rules} />
  <Route path="/players" component={PlayerScreen} />
  <Route path="/scores" component={AddScoreScreen} />
  <Route path="/edit/:playerId" component={EditPlayerScreen} />
  <Route path="/tutorial/*" component={TutorialScreen} />}
</Route>
