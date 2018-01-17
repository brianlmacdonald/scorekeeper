import React from 'react'
import Player from './player'
import SpeechBubble from './SpeechBubble'

export default function({position}){
  return (
    <div className="playersContainer">
    <div>
    <h1 className="tutorialHeader">Start by finding players</h1>
    </div>
    <div className="players">

      <div className="playerOne">
        <Player />
      </div>
      <div className="playerTwo">
        <Player />
      </div>
      <div className="playerThree">
        <Player />
      </div>
      <div className="playerFour">
        <Player />
      </div>
      <div className="playerFive">
        <Player />
      </div>
    </div>
      <div>
      <h2 className={'tutorialHeader marginTop'}>Minumum two. Maximum five. Friends, family, enemies, or complete strangers.</h2>
      </div>
    </div>
  )
}
