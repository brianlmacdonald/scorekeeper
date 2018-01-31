import React, {Component} from 'react'
import Player from './OverviewComponents/player'

export default function Start() {
    return (
      <div id={'start'} className="container makeColumn">
      <div className={'container makeColumn felt fiftyWidth'}>
          <h1 className={'feltHeader'}>Start by finding players.</h1>
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
          <h2 className={'feltHeader marginTop'}>
            Minumum two. Maximum five. Friends, family,
        enemies, or complete strangers.
        </h2>
        </div>
      </div>
    )
}
