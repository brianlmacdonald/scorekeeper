import React, {Component} from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Navigation from './TutorialNavigation'
import CardElement from './CardElement'
import TutorialButton from './TutorialButton'
import Overview from './OverviewScreen'
import Deal from './DealScreen'
import Discard from './DiscardScreen'
import Turn from './TurnScreen'
import Scoring from './ScoringScreen'

import Game from './gameClass'
const tutorialGame = new Game
tutorialGame.createPlayerMaker()()
tutorialGame.deal()

class TutorialSceen extends Component {

  render() {
    return (
      <div id="tutorialScreen">
        <Navigation />
        <Switch>
          {<Route exact path="/tutorial/" component={Overview} />}
          {<Route path="/tutorial/deal" render={() => <Deal game={tutorialGame} />} />}
          {<Route path="/tutorial/discard" component={Discard} />}
          {<Route path="/tutorial/turn" component={Turn} />}
          {<Route path="/tutorial/scoring" component={Scoring} />}
        </Switch>
      </div>
    )
  }
}

const RoutedTutorialScreen = () => (
  <BrowserRouter>
    <TutorialSceen />
  </BrowserRouter>
)

const TutorialSceenContainer = connect(null)(RoutedTutorialScreen)
export default TutorialSceenContainer
