import React from 'react'
import Player from './OverviewComponents/Player'
import SpeechBubble from './OverviewComponents/SpeechBubble'
import CardElement, {BackOfCard} from './CardElement'

const yanivHand = [{
  name: 'A',
  suit: `\u2663`,
  id: 120
},{
  name: '3',
  suit: `\u2660`,
  id: 121
}, {
  name: '2',
  suit: `\u2660`,
  id: 122
}]

const Turn = ({game}) => {
  const singles = game.getSingles()
  const pairs = game.getPairs()
  const flush = game.getFlushes()
  const int = Math.floor(Math.random() * 3)
  const hand = int === 0 ? singles : int === 1 ? pairs : flush

  return (
      <div className='containerCol'>
        <h1>on a turn, you can either...</h1>
      <div className="players">
        <div className="leftAlignContainer">
        <div className="playerOneTurn">
          <h1>discard first</h1>
          <div className="smallerHand">
          <div className="cards">
          {hand.map(card => {
            return <div key={game.round + card.id} className="cardAnimation"><CardElement key={game.round + card.id} props={card} /></div>
          })}
          </div>
          </div>
          <h2>and then draw one card</h2>
          <div className="smallerHand">
          <BackOfCard />
          </div>
          </div>
        </div>
        <div className="divider" />
        <div className="rightAlignContainer">
        <div className="playerOneTurn">
          <h1>or you can call yaniv</h1>
          <div className="smallerHand">
            <div className="cards">
              {yanivHand.map(card => {
                return <div key={game.round + card.id} className="cardAnimation"><CardElement key={game.round + card.id} props={card} /></div>
              })}
            </div>
          </div>
          <h2>if your hand total value is less than 7</h2>
          <h3>Aces are 1. Jokers 0. Picture cards are 10</h3>
        </div>
        </div>
      </div>
      </div>
  )
}

export default Turn
