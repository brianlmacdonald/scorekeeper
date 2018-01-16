import React from 'react'

const Scoring = () => {
  return (
    <div className='scoringContainer'>
      <div className='containerSide'>
      <div>
        <h1>Winning</h1>
          <p>If a player has the lowest hand total at the end of a round</p>
          <p>they have won. No points are added to their total score.</p>
          <p>All other players have their hand's total value added to their</p>
          <p>score. If a player wins 4 or 6 rounds in a row, they've won</p>
          <p>the game. If a player accrues 200 points or more</p>
          <p>they're out of the game.</p>
      </div>
      <div>
        <h1>Jokers</h1>
          <p>Jokers are worth zero and are wild. When a round is over</p>
          <p>if a player has lost with a joker in hand they get 15 points</p>
          <p>added to their score. If a player wins with only Jokers in hand,</p>
          <p>they have 15 points taken off their score for each joker they hold.</p>
      </div>
      </div>
      <div className='containerSide'>
      <div>
        <h1>Assaf</h1>
          <p>If a player calls 'Yaniv' and someone else has a hand total value</p>
          <p>less than or equal to their hand total value, the 'Yaniv Caller'</p>
          <p>has been 'Assaf'd' by the player with the lower or equal score. The</p>
          <p>The 'Assaf Caller' wins the round, with 0 points added to their score.</p>
          <p>The 'Yaniv Caller' loses, gets their hand total value added to their score</p>
          <p>along with 30 points for being 'Assaf'd'.</p>
      </div>
      <div>
        <h1>100, 150, 200</h1>
          <p>If a player's total score lands on 100, 150, or 200, they're total score</p>
          <p>is reduced by 50.</p>
      </div>
      </div>
    </div>

  )
}

export default Scoring
