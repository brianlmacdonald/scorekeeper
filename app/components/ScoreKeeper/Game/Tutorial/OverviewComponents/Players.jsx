import React from 'react'

export default function({position}){
  return (
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
