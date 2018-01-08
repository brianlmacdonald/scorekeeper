import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'

export default class ScrollPos extends Component {
  constructor(props){
    super(props)
      this.state = {
        position: null
      }
      this.handleScroll = this.handleScroll.bind(this)
    
  }

  static PropTypes = {
    children: PropTypes.func.isRequired
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 200));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 200));
  }

  handleScroll(event) {
    const currentPosition = window.scrollY
    this.setState({position: currentPosition})
  }

  render() {
    return (<div>{this.props.children(this.state.position)}</div>)
  }

}