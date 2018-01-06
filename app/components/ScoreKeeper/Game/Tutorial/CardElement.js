import React from 'react'
const cardElement = (card) => {
  return (
    <div className='playingCard'>
      <div className='cardTop'>
      {card.name}
      </div>
      <div className='cardMiddle'>
      {card.suit}
      </div>
      <div className='cardButton'>
      {card.name}
      </div>
    </div>
  )
}