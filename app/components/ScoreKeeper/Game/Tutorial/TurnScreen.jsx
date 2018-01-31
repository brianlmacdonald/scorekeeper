import React, {Component} from 'react'
import Player from './OverviewComponents/player'
import SpeechBubble from './OverviewComponents/SpeechBubble'
import CardElement, {BackOfCard} from './CardElement'

const yanivHand = [{
  name: 'A',
  suit: `\u2663`,
  id: 120
}, {
  name: '2',
  suit: `\u2663`,
  id: 122
}]

class Turn extends Component {
  constructor(props){
    super(props)
    this.state = {
      discard: false,
      intro: true,
    }
    this.discardOrYaniv = this.discardOrYaniv.bind(this)
  }

  discard(round, hand){
    return (<div className={'container makeColumn'}>
      <h2>I dispose of my cards first!</h2>
      <div className={'cards'}>
      {hand.map(card => {
        return <div key={round + card.id} className="cardAnimation"><CardElement key={round + card.id} props={card} /></div>
      })}
      </div>
      <h2>And draw only 1 card!</h2>
      <BackOfCard />
      </div>)
  }

  yaniv(){
    return (
      <div className={'container makeColumn'}>
        <h1>Yaniv!</h1>
      <div className={'cards'}>
        {yanivHand.map(card => {
            return <div key={card.id} className="cardAnimation"><CardElement key={card.id} props={card} /></div>
          })
        }
      </div>
      <h2>For I have seven or less!</h2>
      </div>)
  }

  discardOrYaniv(round, hand) {
    return (this.state.discard ? this.discard(round, hand) : this.yaniv())
  }

  visibleHand(round, hand){
    return (this.state.intro ? <BackOfCard /> : this.discardOrYaniv(round, hand))
  }

  handleAnyClick(){
    this.setState({intro: false})
  }

  handleDiscard(){
    this.setState({discard: true})
  }

  handleYaniv(){
    this.setState({discard: false})
  }

  render(){
    const game = this.props.game
    const singles = game.getSingles()
    const pairs = game.getPairs()
    const discard = game.getSingles()
    const flush = game.getFlushes()
    const int = Math.floor(Math.random() * 3)
    const cards = int === 0 ? singles : int === 1 ? pairs : flush

    return (
      <div id={'start'} className={'container felt'}>
        <div className={'container makeColumn'}>
          <h1>On a turn, you can either...</h1>
        <div className={'container'}>
          <button
            className={'homeButton'}
            onClick={() => {
              this.handleAnyClick()
              this.handleDiscard()

            }}
          >discard</button>
          <h2> or </h2>
          <button
            className={'homeButton'}
            onClick={() => {
              this.handleAnyClick()
              this.handleYaniv()
            }}
          >call yaniv</button>
        </div>
          <div className={'cards'}>
            {this.visibleHand(game.round, cards)}
          </div>
        </div>
        </div>
    )

  }
}

export default Turn
