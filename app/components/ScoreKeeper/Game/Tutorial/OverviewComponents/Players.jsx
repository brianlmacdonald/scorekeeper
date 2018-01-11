import React from 'react'

export default function({position}){
  return (
    <div className="playersContainer">
    <div>
    <h1 className="tutorialHeader">find players</h1>
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
      <h2 className="tutorialHeader">Minumum two. Maximum five. Friends, family or strangers.</h2>
      </div>
    </div>
  )
}

const Player = () => {
  return (
    <div className="person">
      <div className="eyes">
      <div className="leftEye">
        <div className="pupil" />
      </div>
      <div className="rightEye" >
        <div className="pupil" />
      </div>
      </div>
      <div className="nose" />
      <div className="mouth" />
    </div>
  )
}
