import React, {Component} from 'react'
import CardElement from './CardElement'
import TutorialButton from './TutorialButton'
import Game from './gameClass'
import {connect} from 'react-redux'
const tutorialGame = new Game
tutorialGame.createPlayerMaker()()

class TutorialSceen extends Component {
  constructor(props){
    super(props)
    this.state = {
      stepIndex: 0,
      player: {}
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.dealCards = this.dealCards.bind(this)
    this.dealInstructions = this.dealInstructions.bind(this)
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return {handler: this.dealCards, name: 'deal'};
      case 1:
        return {handler: console.log, name: 'got here'};
      default:
        return <div><h1>Error!</h1></div>
    }
  }

  dealCards(){
    tutorialGame.resetCards()
    tutorialGame.deal()
    this.setState({player: tutorialGame.players[0]})
  }

  dealInstructions(){
    return(
      <div className='container'>
      <p>yaniv is a discard game</p>
      <p>two to five players</p>
      <p>start by dealing 5 cards</p>
      </div>
    )
  }

  render() {
    console.log(tutorialGame)
    console.log(this.state)
    const card = {
      name: 'J',
      number: 10,
      suit: `\u2660`,
      dealt: false,
      id: 11

    }
    let ready = Object.keys(this.state.player).length !== 0 && this.state.player.hand.length !== 0
    const deck = tutorialGame.deck
    return (
      <div className="container">
        <div className="felt">
        {ready && this.state.player.hand.map(card => {
            return <CardElement key={deck[card].id} props={deck[card]} />
        }) || this.dealInstructions()}
        </div>
        <div className="buttonContainer">
          <button
            onClick={this.handlePrev}
            className='homeButton'
          >back</button>
          <button
          className='homeButton'
          onClick={this.handleNext}
          >next</button>
          <TutorialButton props={this.getStepContent(this.state.stepIndex)} />
        </div>
      </div>
    )

  }


}

const TutorialSceenContainer = connect(null)(TutorialSceen)
export default TutorialSceenContainer
