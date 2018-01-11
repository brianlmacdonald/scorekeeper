import React from 'react'
import CardElement, {BackOfCard} from './CardElement'

const Deal = ({game}) => {
  let ready = game && Object.keys(game).length !== 0 && game.players[0].hand !== 0
  let player = ready ? game.players[0] : {}
  let deck = ready ? game.deck : {}
  return (
    <div className='container'>
      <div className="felt">
        <div className="playerHand">
          <h1 className={'dealInstructions stepOne'}>deal each player five cards</h1>
          <div className="cards">
            {ready && player.hand.map(card => {
              return <div key={card} className='cardAnimation'><CardElement key={card} props={deck[card]} /></div>
            })}
          </div>
        </div>
      <div className="discard">
        <h1 className={'dealInstructions stepTwo'}>then flip the top card on the deck</h1>
          <div className={"containerRow"}>
          {ready && <CardElement props={deck[game.discardPile.top.value]} />}
          <BackOfCard />
          </div>
      </div>
      </div>
    </div>
  )
}

export default Deal
