import React, {Component} from 'react'
import Players from './OverviewComponents/Players'
import {throttle} from 'lodash'

export default function Overview() {
    return (
      <div className="container">
        <Players />
      </div>
    )
}
