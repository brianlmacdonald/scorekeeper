import React from 'react'
import CardElement from './CardElement'

const Deal = ({game}) => {
  let ready = game && Object.keys(game).length !== 0 && game.players[0].hand !== 0
  let player = ready ? game.players[0] : {}
  let deck = ready ? game.deck : {}
  console.log(game, player, deck)
  return (
    <div>
      <h1>deal</h1>
      <div className="felt">
      <div className="discard">
        <h1>discard pile</h1>
          {ready && <CardElement props={deck[game.discardPile.top.value]} />}
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
      <div>
        <p>deal each player five cards</p>
      </div>
    </div>
  )
}

export default Deal
