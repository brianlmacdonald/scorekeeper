import React from 'react'
import CardElement, {BackOfCard} from './CardElement'

const Deal = ({game}) => {
  let ready = game && Object.keys(game).length !== 0 && game.players[0].hand !== 0
  let player = ready ? game.players[0] : {}
  let deck = ready ? game.deck : {}

  return (
    <div className={'addTop newScreen'}>
    <h1 className={'dealInstructions'}>Deal each player five cards using a deck with jokers.</h1>
        <div className="playerHand">
          <div className="cards">
            {ready && player.hand.map(card => {
              return <div key={card} className="cardAnimation"><CardElement key={card} props={deck[card]} /></div>
            })}
          </div>
        </div>
      <div className={'container makeColumn'}>
        <h2 className={'dealInstructions'}>Then flip the top card on the deck.</h2>
          <div className={'container'}>
          {ready && <CardElement props={deck[game.discardPile.top.value]} />}
          <BackOfCard />
          </div>
          <h2 className={'dealInstructions'}>This is where you discard and draw.</h2>
      </div>
      </div>
  )
}

export default Deal
