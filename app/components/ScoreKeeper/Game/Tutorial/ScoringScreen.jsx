import React from 'react'

const Scoring = () => {
  return (
    <div className="container newScreen">
      <div className="container makeColumn giveMargin">
          <div className={'container makeColumn halfFelt'}>
            <h1 className={'feltHeaders'}>Winning</h1>
          <p>A round ends when someone calls 'Yaniv'. If the Yaniv
          Caller has the lowest hand total at the end of a round
          they have won. No points are added to the Yaniv Callers's
          total score. All other players have their hand's total value
          added to their score. If a player wins 4 (or 6) rounds in a
          row, they've won the game. If a player accrues 200 points
          or more they're out of the game.</p>
        </div>
        <div className={'container makeColumn halfFelt'}>
          <h1 className={'feltHeaders'}>Jokers</h1>
          <p>Jokers are worth zero and are wild. When a round is over
          if a player has lost with a Joker in hand they have 15
          points added to their score. If a player wins with only Jokers
          in hand, they have 15 points taken off their score for each
          joker they hold.</p>
        </div>
      </div>
      <div className="container makeColumn giveMargin">
        <div className={'container makeColumn halfFelt'}>
          <h1 className={'feltHeaders'}>Assaf</h1>
            <p>If a player calls 'Yaniv' but another player has a hand total
            value less than or equal to the Yaniv Caller's, the Yaniv
            Caller has been 'Assaf'd', and the player with the lower hand
            cries 'Assaf!' in the Yaniv Caller's face, maybe even chuckles
            a bit for good measure. The Assaf Cryer wins the round, with
            0 points added to their score. The Yaniv Caller loses,
            and has their hand total value added to their score along
            with 30 points for being 'Assaf'd'.</p>
        </div>
        <div className={'container makeColumn halfFelt'}>
          <h1 className={'feltHeaders'}>100, 150, 200</h1>
          <p>If a player's total score lands on 100, 150, or 200, their
          total score is reduced by 50.</p>
      </div>
      </div>
    </div>

  )
}

export default Scoring
