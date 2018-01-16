import React from 'react'
export default function CardElement({props}) {
  const red = props.suit === `\u2764` || props.suit === `\u2666`
  return (
    <div
    className={red ? 'playingCard red' : 'playingCard'}
    >
      <div className="cardTop">
        <div>{props.name}</div>
      </div>
      <div className="cardMiddle">
        <div className="cardSpacer" /><div>{props.suit}</div><div className="cardSpacer" />
      </div>
      <div className="cardBottom">
        <div className="cardSpacer" /><div className="cardSpacer" /><div>{props.name}</div>
      </div>
    </div>
  )
}

export function BackOfCard() {
  return (
        <div className="playingCard">
          <div className="backOfCard">
            <div className="rectangle">
              <h1>:</h1>
            </div>
          </div>
        </div>
      )
}
