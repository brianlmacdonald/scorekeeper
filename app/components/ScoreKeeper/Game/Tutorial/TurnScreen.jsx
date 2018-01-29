import React from 'react'
import Player from './OverviewComponents/player'
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
  const discard = game.getSingles()
  const flush = game.getFlushes()
  const int = Math.floor(Math.random() * 3)
  const hand = int === 0 ? singles : int === 1 ? pairs : flush
  const values = [1, 2, 3, 4, 5, 6, 7, 53]

  return (
      <div className={'container makeColumn'}>
        <h1>On a turn, you can either...</h1>
      <div className="turnScreen">
        <div className="leftAlignContainer">
        <div className="playerOneTurn">
          <h1>discard first...</h1>
          <div className="smallerHand">
          <div className="cards">
          {hand.map(card => {
            return <div key={game.round + card.id} className="cardAnimation"><CardElement key={game.round + card.id} props={card} /></div>
          })}
          </div>
          </div>
          <h2>and then draw one card...</h2>
          <div className="smallerHand">
          <CardElement props={discard[0]} />
          <BackOfCard />
          </div>
          <h4>from the deck, or top of the discard pile.</h4>
          </div>
        </div>
        <div className="divider" />
        <div className="rightAlignContainer">
        <div className="playerOneTurn">
          <h1>or call Yaniv...</h1>
          <div className="smallerHand">
            <div className="cards">
              {yanivHand.map(card => {
                return <div key={game.round + card.id} className="cardAnimation"><CardElement key={game.round + card.id} props={card} /></div>
              })}
            </div>
          </div>
          <h2>if your hand's total is 7, or less.</h2>
            <div className='smallerFelt'>
              {values.map(id => {
                return <div key={game.round + 'v' + id} className="cardAnimation">
                <CardElement key={game.round + 'v' + id} props={game.deck[id]} />
                </div>
              })}
            </div>
            <h4>Calling Yaniv ends the round. Lowest hand total wins.</h4>
        </div>
        </div>
      </div>
      </div>
  )
}

export default Turn
