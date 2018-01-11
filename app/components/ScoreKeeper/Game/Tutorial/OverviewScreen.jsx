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
    console.log(this.state.position)
    const playersReady = this.state.position > -1 && this.state.position < 350;
    const dealReady = this.state.position > 550 ** this.state.position < 950;
    return (
      <div className="container">
        {playersReady && <Players />}
        {dealReady}
      </div>
    )
  }
}
