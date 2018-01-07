import React from 'react'
const cardElement = ({props}) => {
  return (
    <div className="playingCard">
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

export default cardElement
