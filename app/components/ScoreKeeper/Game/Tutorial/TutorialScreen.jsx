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
import Sandbox from './Sandbox'
import Yaniv from './Yaniv'

import Game from './gameClass'
const tutorialGame = new Game
tutorialGame.createPlayerMaker()()
tutorialGame.deal()

const TutorialSceen = () => {
    return (
      <div id="tutorialScreen">
        <Navigation />
        <Switch>
          {<Route exact path="/tutorial/" component={Overview} />}
          {<Route path="/tutorial/deal" render={() => <Deal game={tutorialGame} />} />}
          {<Route path="/tutorial/discard" render={() => <Discard game={tutorialGame} />} />}
          {<Route path="/tutorial/turn" render={() => <Turn game={tutorialGame} />} />}
          {<Route path="/tutorial/scoring" component={Scoring} />}
          {<Route path="/tutorial/yaniv" render={() => <Yaniv game={tutorialGame} />} />}
          {<Route path="/tutorial/sandbox" component={Sandbox} />}
        </Switch>
      </div>
    )
}

const RoutedTutorialScreen = () => (
  <BrowserRouter>
    <TutorialSceen />
  </BrowserRouter>
)

const TutorialSceenContainer = connect(null)(RoutedTutorialScreen)
export default TutorialSceenContainer
