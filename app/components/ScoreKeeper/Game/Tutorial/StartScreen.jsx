import React, {Component} from 'react'
import Player from './OverviewComponents/player'

export default function Start() {
    return (
      <div className="container makeColumn addTop newScreen">
          <h1 className={'feltHeaders'}>Start by finding players.</h1>
          <div className="container">

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
          <h2 className={'feltHeaders marginTop'}>
            Minumum two. Maximum five. Friends, family,
        enemies, or complete strangers.
        </h2>
        </div>
    )
}
