import React from 'react'
import CardElement, { BackOfCard } from './CardElement'

const classes = {}

const Dealing = () => {
  return (
    <div>
      <h1>deal each player 5 cards</h1>
      <h1>flip the top card of the deck over</h1>
      <h1>that's now the discard pile</h1>
      <div className="felt">
        <div className="discard">
          <h1>discard pile</h1>
          <div className="containerRow">
            {ready && <CardElement props={deck[game.discardPile.top.value]} />}
            <BackOfCard />
          </div>
        </div>
        <div className="playerHand">
          <div className="cards">
            {ready && player.hand.map(card => {
              return <CardElement key={deck[card].id} props={deck[card]} />
            })}
          </div>
          <h1>player hand</h1>
        </div>
      </div>
    </div>
  )
}

export default Deal
