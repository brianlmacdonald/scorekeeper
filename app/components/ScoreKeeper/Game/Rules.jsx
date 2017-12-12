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
  wins(Styles) {
    return (
      <div>
        <Paper style={Styles.paperContainer} zDepth={2}>
          <h4>Match points needed to win:</h4>
        <RadioButtonGroup
          defaultSelected={4}
          style={Styles.containerRow}
          name="matchPoints"
          onChange={(evt) => this.setState({  matchWins: Number(evt.target.value) })}>
          <RadioButton
          value={4} 
          label='4'/>
          <RadioButton
          value={6}
          label='6'
          />
        </RadioButtonGroup>
        </Paper>
      </div>
    )
  }

  jokers(Styles) {
    return (
      <div>
        <Paper style={Styles.paperContainer} zDepth={2}>
          <h4>Losing Joker Value:</h4>
          <RadioButtonGroup
            defaultSelected={0}
            style={Styles.containerRow}
            name="matchPoints"
            onChange={(evt) => this.setState({ jokers: Number(evt.target.value) })}>
            <RadioButton
              value={0}
              label='0' />
            <RadioButton
              value={-15}
              label='-15'
            />
          </RadioButtonGroup>
        </Paper>
      </div>
    )
  }

  bonus(Styles) {
    return (
      <div>
        <Paper style={Styles.paperContainer} zDepth={2}>
          <h4>Bonus on 100, 150, 200:</h4>
          <RadioButtonGroup
            defaultSelected={0}
            style={Styles.containerRow}
            name="matchPoints"
            onChange={(evt) => this.setState({ bonus: Number(evt.target.value) })}>
            <RadioButton
              value={0}
              label='0' />
            <RadioButton
              value={-50}
              label='-50'
            />
          </RadioButtonGroup>
        </Paper>
      </div>
    )
  }

  render() {
    const Styles = this.props.route.style
    const handleNewGameSubmit = this.props.handleNewGameSubmit
    return (
      <div style={Styles.container}>
        <div style={Styles.spacer} />
        <h1>rules</h1>
        <div style={Styles.spacer} />
        {this.wins(Styles)}
        {this.jokers(Styles)}
        {this.bonus(Styles)}
        <RaisedButton
          style={Styles.button}
          containerElement={<Link to='/players' />}
          onClick={() => {
          
            const rules = {
              jokers: this.state.jokers,
              bonus: this.state.bonus,
              matchWins: this.state.matchWins
            }
            handleNewGameSubmit(rules)
          }}
          label='submit'
        />
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
