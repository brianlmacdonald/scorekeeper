import React, {Component} from 'react'
import { Paper } from 'material-ui'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {getRulesAction} from '../../../store'

class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokers: 0,
      bonus: 0,
      matchWins: 4
    }
  }
  wins() {
    return (
      <div>
        <Paper className="paperContainer" zDepth={2}>
          <h4>Match points needed to win:</h4>
          <form
            className="radioContainer"
            onChange={(evt) => this.setState({ matchWins: Number(evt.target.value) })}
            >
            <input
              className="radioButton"
              type="radio" id="fourWins" value={4}
              checked={this.state.matchWins === 4} />
            <label htmlFor="fourWins">4</label>
            <div className="spacer" />
            <input
              className="radioButton"
              type="radio" id="sixWins" value={6}
              checked={this.state.matchWins === 6} />
            <label htmlFor="sixWins">6</label>
          </form>
        </Paper>
      </div>
    )
  }

  jokers() {
    return (
      <div>
        <Paper className="paperContainer" zDepth={2}>
          <h4>Losing Joker Value:</h4>
          <form
            className="radioContainer"
            onChange={(evt) => this.setState({ jokers: Number(evt.target.value) })}
          >
            <input
              className="radioButton"
              type="radio" id="minusZero" value={0}
              checked={this.state.jokers === 0} />
            <label
              htmlFor="minusZero">0</label>
            <div className="spacer" />
            <input
              className="radioButton"
              type="radio" id="minusFifteen" value={15}
              checked={this.state.jokers === 15} />
            <label
              htmlFor="minusFifteen">15</label>
          </form>
        </Paper>
      </div>
    )
  }

  bonus() {
    return (
      <div>
        <Paper className="paperContainer" zDepth={2}>
          <h4>Bonus on 100, 150, 200:</h4>
          <form
            className="radioContainer"
            onChange={(evt) => this.setState({ bonus: Number(evt.target.value) })}
          >
            <input
              className="radioButton"
              type="radio" id="zeroBonus" value={0}
              checked={this.state.bonus === 0} />
            <label htmlFor="zeroBonus">0</label>
            <div className="spacer" />
            <input
              className="radioButton"
              type="radio" id="fiftyBonus" value={-50}
              checked={this.state.bonus === -50} />
            <label htmlFor="fiftyBonus">-50</label>
          </form>
        </Paper>
      </div>
    )
  }

  render() {
    const handleNewGameSubmit = this.props.handleNewGameSubmit
    return (
      <div className="container">
        <div className="spacer" />
        <h1 className="rulesHeader">rules</h1>
        <div className="spacer" />
        {this.wins()}
        {this.jokers()}
        {this.bonus()}
        <Link to="/players"><button
          className="homeButton"
          onClick={() => {
            const rules = {
              jokers: this.state.jokers,
              bonus: this.state.bonus,
              matchWins: this.state.matchWins
            }
            handleNewGameSubmit(rules)
          }}
        >submit</button></Link>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  handleNewGameSubmit(rules) {
    dispatch(getRulesAction(rules))
  }
})

const mapState = (state) => ({
  rules: state.rules
})

const RulesContainer = connect(mapState, mapDispatch)(Rules)

export default RulesContainer;
