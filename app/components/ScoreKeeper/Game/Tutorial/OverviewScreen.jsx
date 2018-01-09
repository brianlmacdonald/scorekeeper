import React, {Component} from 'react'
import Players from './OverviewComponents/Players'
import {throttle} from 'lodash'

export default class Overview extends Component {
  constructor(){
    super()
    this.state = {
      position: null
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 200));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 200));
  }

  handleScroll(event) {
    const currentPosition = window.scrollY
    this.setState({ position: currentPosition })
  }

  render(){
    const playersReady = this.state.position > 150 && this.state.position < 550;
    const scrollReady = this.state.position > -2 && this.state.position < 100;
    const dealReady = this.state.position > 550 ** this.state.position < 950;
    return (
      <div className="testDiv">
        {scrollReady && <h1 className='scrollReady'>scroll down for walkthrough</h1>}
        {playersReady && <Players />}
        {dealReady}
      </div>
    )
  }
}
