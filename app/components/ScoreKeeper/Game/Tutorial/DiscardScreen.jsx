import React, {Component} from 'react'
import CardElement from './CardElement'

export default class Discard extends Component {
  constructor(props){
    super(props)
    this.state = {
      step: 0
    }
    this.handleStep = this.handleStep.bind(this)
  }

  handleStep(){
    const next = (this.state.step + 1) % 3
    this.setState({step: next})
  }

  render() {
  const {game} =  this.props
  const singles = game.getSingles()
  const pairs = game.getPairs()
  const flush = game.getFlushes()
  const options = [singles, pairs, flush]
  const hand = options[this.state.step]
  return (
    <div className='felt'>
      <h1>You can discard {this.state.step === 0 ? 'singles' : this.state.step === 1 ? '2 of a kind or more.' : 'straight flushes of 3 or more.'}</h1>
      <div className="cards">
        {hand.map(card => {
          return <div key={game.round + card.id} className="cardAnimation"><CardElement key={game.round + card.id} props={card} /></div>
        })}
      </div>
        <button
        onClick={this.handleStep}
        className="homeButton">{this.state.step === 0 ? 'Singles. Got it.' : this.state.step === 1 ? 'Pairs. Ok!' : 'Straight flushes!'}</button>
    </div>
  )
}
}
