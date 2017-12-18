import React, {Component} from 'react'
import {RadioButton, Paper, RadioButtonGroup, RaisedButton} from 'material-ui'
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
        <Paper className='paperContainer' zDepth={2}>
          <h4>Match points needed to win:</h4>
        <RadioButtonGroup
          defaultSelected={4}
          className='radioContainer'
          name="matchPoints"
          onChange={(evt) => this.setState({  matchWins: Number(evt.target.value) })}>
          <RadioButton
          className="radioButton"
          value={4}
          label="4" />
          <RadioButton
          className="radioButton"
          value={6}
          label="6"
          />
        </RadioButtonGroup>
        </Paper>
      </div>
    )
  }

  jokers() {
    return (
      <div>
        <Paper className='paperContainer' zDepth={2}>
          <h4>Losing Joker Value:</h4>
          <RadioButtonGroup
            defaultSelected={0}
            className='radioContainer'
            name="matchPoints"
            onChange={(evt) => this.setState({ jokers: Number(evt.target.value) })}>
            <RadioButton
              className="radioButton"
              value={0}
              label="0" />
            <RadioButton
              className="radioButton"
              value={15}
              label="15"
            />
          </RadioButtonGroup>
        </Paper>
      </div>
    )
  }

  bonus() {
    return (
      <div>
        <Paper className='paperContainer' zDepth={2}>
          <h4>Bonus on 100, 150, 200:</h4>
          <RadioButtonGroup
            defaultSelected={0}
            className='radioContainer'
            name="matchPoints"
            onChange={(evt) => this.setState({ bonus: Number(evt.target.value) })}>
            <RadioButton
              className="radioButton"
              value={0}
              label="0" />
            <RadioButton
              className="radioButton"
              value={-50}
              label="-50"
            />
          </RadioButtonGroup>
        </Paper>
      </div>
    )
  }

  render() {
    const handleNewGameSubmit = this.props.handleNewGameSubmit
    return (
      <div className='container'>
        <div className='spacer' />
        <h1 className='rulesHeader'>rules</h1>
        <div className='spacer' />
        {this.wins()}
        {this.jokers()}
        {this.bonus()}
        <Link to='/players'><button
          className='homeButton'
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
