import React, {Component} from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Navigation from './TutorialNavigation'
import CardElement from './CardElement'
import StartScreen from './StartScreen'
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
        <div id={'start'} className={'container felt'}>
        <Switch>
          {<Route exact path="/tutorial/start" component={StartScreen} />}
          {<Route path="/tutorial/deal" render={() => <Deal game={tutorialGame} />} />}
          {<Route path="/tutorial/discard" render={() => <Discard screen={'discard'}game={tutorialGame} />} />}
          {<Route path="/tutorial/turn" render={() => <Turn game={tutorialGame} />} />}
          {<Route path="/tutorial/draw" render={() => <Discard screen={'draw'} game={tutorialGame} />} />}
          {<Route path="/tutorial/scoring" component={Scoring} />}
          {<Route path="/tutorial/yaniv" render={() => <Yaniv game={tutorialGame} />} />}
          {<Route path="/tutorial/sandbox" component={Sandbox} />}
        </Switch>
        </div>
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
