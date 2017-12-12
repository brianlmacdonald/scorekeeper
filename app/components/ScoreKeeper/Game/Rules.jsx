import React, {Component} from 'react'
import {RadioButton, Paper, RadioButtonGroup, RaisedButton} from 'material-ui'

class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokersZero: 0,
      divisibleByFifty: 0,
      sequentialWins: 4
    }
  }
  SequentialWins(Styles) {
    return (
      <div>
        <Paper style={Styles.paperContainer} zDepth={2}>
          <h4>Match points needed to win:</h4>
        <RadioButtonGroup
          defaultSelected={4}
          style={Styles.containerRow}
          name="matchPoints"
          onChange={(evt) => this.setState({ sequentialWins: evt.target.value })}>
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

  JokersValue(Styles) {
    return (
      <div>
        <Paper style={Styles.paperContainer} zDepth={2}>
          <h4>Losing Joker Value:</h4>
          <RadioButtonGroup
            defaultSelected={0}
            style={Styles.containerRow}
            name="matchPoints"
            onChange={(evt) => this.setState({ jokersZero: evt.target.value })}>
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

  DivisibleByFiftyRule(Styles) {
    return (
      <div>
        <Paper style={Styles.paperContainer} zDepth={2}>
          <h4>Bonus on 100, 150, 200:</h4>
          <RadioButtonGroup
            defaultSelected={0}
            style={Styles.containerRow}
            name="matchPoints"
            onChange={(evt) => this.setState({ divisibleby50: evt.target.value })}>
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
    return (
      <div style={Styles.container}>
        <div style={Styles.spacer} />
        <h1>rules</h1>
        <div style={Styles.spacer} />
        {this.SequentialWins(Styles)}
        {this.JokersValue(Styles)}
        {this.DivisibleByFiftyRule(Styles)}
        <RaisedButton
          style={Styles.button}
          onClick={() => {

            const options = {
              jokersZero: this.state.jokersZero,
              divisibleByFifty: this.state.divisibleByFifty,
              sequentialWins: this.state.sequentialWins ? 4 : 6
            }
            handleNewGameSubmit(options)
            this.props.navigation.navigate('Game')
          }}
          label='submit'
        />
      </div>
    )
  }
}

export default Rules;
