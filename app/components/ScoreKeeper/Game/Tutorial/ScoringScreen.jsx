import React from 'react'

const Scoring = () => {
  return (
    <div className='scoringContainer'>
      <div className='containerSide'>
      <div>
        <h1>Winning</h1>
          <p>A round ends when someone calls 'Yaniv'. If the 'Yaniv</p>
          <p>Caller' has the lowest hand total at the end of a round</p>
          <p>they have won. No points are added to the Yaniv Callers'</p>
          <p>total score. All other players have their hand's total value</p>
          <p>added to their score. If a player wins 4 (or 6) rounds in a</p>
          <p>row, they've won the game. If a player accrues 200 points</p>
          <p>or more they're out of the game.</p>
      </div>
      <div>
        <h1>Jokers</h1>
          <p>Jokers are worth zero and are wild. When a round is over</p>
          <p>if a player has lost with a Joker in hand they have 15</p>
          <p>points added to their score. If a player wins with only Jokers</p>
          <p>in hand, they have 15 points taken off their score for each</p>
          <p>joker they hold.</p>
      </div>
      </div>
      <div className='containerSide'>
      <div>
        <h1>Assaf</h1>
          <p>If a player calls 'Yaniv' but another player has a hand total</p>
          <p>value less than or equal to the 'Yaniv Callers', the 'Yaniv</p>
          <p>Caller' has been 'Assaf'd'. The 'Assaf Caller' wins the round,</p>
          <p>with 0 points added to their score. The 'Yaniv Caller' loses,</p>
          <p>and has their hand total value added to their score along</p>
          <p>with 30 points for being 'Assaf'd'.</p>
      </div>
      <div>
        <h1>100, 150, 200</h1>
          <p>If a player's total score lands on 100, 150, or 200, their</p>
          <p>total score is reduced by 50.</p>
      </div>
      </div>
    </div>

  )
}

export default Scoring
