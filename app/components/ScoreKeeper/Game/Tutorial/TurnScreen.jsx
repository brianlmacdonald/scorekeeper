import React from 'react'
import Player from './OverviewComponents/Player'
import SpeechBubble from './OverviewComponents/SpeechBubble'
import CardElement from './CardElement'

const cardPairs = {
  one: {
    name: "K",
    suit: `\u2663`
  },
  two: {
    name: "K",
    suit: `\u2660`

  }
}

const yanivHand = {
  name: "A",
  suit: `\u2663`
}

const Turn = () => {
  return (
    <div className="playersContainer">
      <div>
        <h1 className="tutorialHeader">on a turn you can either</h1>
      </div>
      <div className="players">

        <div className="playerOneTurn">
          <SpeechBubble text={'yaniv!'} />
          <Player />
          <div className='smallerHand'>
            <CardElement props={yanivHand} />
          </div>
        </div>
        <div className='leftAlignContainer'>
        <SpeechBubble text={'I shall discard!'} />
        <div className="playerTwoTurn">
          <Player />
        </div>
          <div className='smallerHand'>
            <CardElement props={cardPairs.one} />
            <CardElement props={cardPairs.two} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Turn
