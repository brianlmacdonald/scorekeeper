import React, {Component} from 'react'
import CardElement, {BackOfCard} from './CardElement'


//The discard Component is recycled as the Drawing Component,
//since picking up discards is a major part of drawing.
export default class Discard extends Component {
  constructor(props){
    super(props)
    this.state = {
      step: 0
    }
    this.handleStep = this.handleStep.bind(this)
    this.discardHeader = this.discardHeader.bind(this)
    this.drawHeader = this.drawHeader.bind(this)
    this.handleDrawStep = this.handleDrawStep.bind(this)
  }

  handleStep(){
    const next = (this.state.step + 1) % 3
    this.setState({step: next})
  }

  handleDrawStep(){
    if (this.state.step === 0) {
      return 'a single'
    } else if (this.state.step === 1) {
      return 'pairs or more'
    } else {
      return 'a straight flush'
    }
  }

  drawHeader(hand){
    return (
        <div className={'container makeColumn'}>
        <h1 className={'feltHeaders'}>If the last person discarded {this.handleDrawStep()},
        you can take {this.state.step === 0 ?
          'just the one discard.' :
          this.state.step === 1 ?
            'any one of their discards.' :
            `the ${hand[0].name} or ${hand[hand.length - 1].name}, not the middle discards.`}
        </h1>
        </div>
    )
  }

  discardHeader(){
    return (
      <h1 className={'feltHeaders'}>You can discard {this.state.step === 0 ?
        'singles.' :
        this.state.step === 1 ?
        '2 of a kind or more.' :
        'straight flushes of 3 or more.'}
      </h1>)
  }

  render() {
  const {game, screen} =  this.props
  const singles = game.getSingles()
  const pairs = game.getPairs()
  const flush = game.getFlushes()
  const options = [singles, pairs, flush]
  const hand = options[this.state.step]
  return (
    <div className={'container makeColumn addTop newScreen'}>
      {this.props.screen === 'discard' ?
      this.discardHeader() :
      this.drawHeader(hand)
    }
      <div className="cards">
        {hand.map(card => {
          return <div key={game.round + card.id} className="cardAnimation"><CardElement key={game.round + card.id} props={card} /></div>
        })}
      </div>
      {this.props.screen === 'draw' ?
      <div className={'container makeColumn addTop'}>
      <h2 className={'feltHeaders'}>Or draw one off the top of the deck.</h2>
      <BackOfCard />
      </div> :
      <div />
    }
        <button
        onClick={this.handleStep}
        className="homeButton">{this.state.step === 0 ? 'Got it.' : this.state.step === 1 ? 'Cool.' : 'Yup.'}</button>
    </div>
  )
}
}
