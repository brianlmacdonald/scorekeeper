import React, { Component } from 'react'
import CardElement, { BackOfCard } from './CardElement'


class Sandbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discard: [],
      good: true,
      player: this.props.game.players[0].hand,
      ready: false,
      discardPile: this.props.game.discardPile.top.value,
      pickUp: false
    }
  }

  handleNominate(card) {
    if (!this.state.discard.includes(card)) {
      this.setState({ discard: [...this.state.discard, card] })
      this.setState({ player: this.state.player.filter(disc => disc !== card) })

    } else {
      this.setState({ discard: this.state.discard.filter(disc => disc !== card) })
      this.setState({ player: [...this.state.player, card] })
    }
    this.setState({ good: true })
  }

  pickUpDiscardPile() {
    this.setState({ pickUp: true })
  }
  pickUpDeck() {
    this.setState({ pickUp: false })
  }

  render() {
    const { game } = this.props
    const ready = Object.keys(game).length !== 0 && game.players[0].hand !== 0
    const readyDiscard = this.state.discard.length !== 0
    console.log(this.state)
    if (ready) {
      const deck = game.deck
      return (
        <div>
          <div className="container">
            <h1 className={!this.state.good ? 'yellBad' : 'hideBad'}>BAD DISCARD</h1>
            <div className={'discard mediumArea'}>
              <div className="discardPile">
                <div className={this.state.pickUp ? 'yellBad arrow' : 'hideBad'}>[</div>
                <div onClick={() => { this.pickUpDiscardPile() }}><CardElement props={deck[this.state.discardPile]} /></div>
                <div onClick={() => { this.pickUpDeck() }}><BackOfCard /></div>
                <div className={!this.state.pickUp ? 'yellBad arrow' : 'hideBad'}>]</div>
              </div>
              <div className={'cards smaller'}>
                {readyDiscard && this.state.discard.map(card => {
                  return (<div
                    key={card}
                    onClick={() => this.handleNominate(card)}
                    className="cardAnimation"><CardElement key={card} props={deck[card]} /></div>)
                })}
              </div>
            </div>
            <div className="cards leftMargin">
              {ready && this.state.player.map(card => {
                return (<div
                  key={card}
                  onClick={() => this.handleNominate(card)}
                  className="cardAnimation"><CardElement key={card} props={deck[card]} /></div>)
              })}
            </div>
            <button
              className="homeButton"
              onClick={() => {
                if (game.validateDiscard(this.state.discard)) {
                  this.setState({ good: true })
                  this.setState({ player: game.players[0].hand })
                  this.setState({ discard: [] })
                } else {
                  console.log('boo')
                  this.setState({ good: false })
                }
              }}
            >discard</button>
          </div>
        </div>
      )
    } else {
      return <div className="blink">loading</div>
    }
  }

}

export default Sandbox
