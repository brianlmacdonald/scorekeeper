import React, { Component } from 'react'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { connect } from 'react-redux'
import { addPlayersAction, playerNamesAction } from '../../../store'
import { Link } from 'react-router'

import {makePlayers} from './gameFunctions'

class PlayerScreen extends Component {
  constructor(){
    super()
    this.state = {
      numberOfPlayers: 2,
      stepIndex: 0
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.numberSelect = this.numberSelect.bind(this)
    this.names = this.names.bind(this)
    this.error = this.error.bind(this)
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleSelect(value) {
    this.setState({numberOfPlayers: value})

  }

  error() {
    return (
      <p>uh oh.</p>
    )
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.numberSelect;
      case 1:
        return this.names;
      default:
        return this.error;
    }
  }

  numberSelect(){
    return (<div className="container">
      <h1 className="numberOfPlayers">number of players:</h1>
      <select
        className="playerSelect"
        name="number of players"
        onChange={(evt) => {
          const selected = evt.target.value
          this.handleSelect(selected)
        }}
        >
        <option value={2}>two</option>
        <option value={3}>three</option>
        <option value={4}>four</option>
        <option value={5}>five</option>
      </select>
    </div>)
  }

  names(handleNameChange){
    return (<div id="nameEntry">
      {this.props.players.length && this.props.players.map(player => {
        return (<div
            className="container"
          key={player.id}>
          <input
            className="playerNameField"
            placeholder={`Player ${player.id}'s name?`}
            onChange={(evt) => {
            player.name = evt.target.value
            handleNameChange(player)
          }} /></div>)
      })}
    </div>)
  }

  render(){
    const {handleReady, handleNameChange} = this.props
    const { stepIndex} = this.state
    return (
      <div className="stepperContainer">
          <div className="stepper">
          <Stepper className="stepper" activeStep={stepIndex}>
            <Step>
              <StepLabel className="stepperLabel">Number Of Players</StepLabel>
            </Step>
            <Step>
              <StepLabel className="stepperLabel">Name Players</StepLabel>
            </Step>
          </Stepper>
          </div>
          <div className="stepperdiv">
                <div>
                  <div>{this.getStepContent(stepIndex)(handleNameChange)}</div>
                  <div style={{ marginTop: 12 }}>
                    <button
                      className="homeButton"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                      style={{ marginRight: 12 }}
                    >back</button>
                    <button
                      className="homeButton"
                      onClick={(evt) => {
                        evt.preventDefault()
                        if (!stepIndex) {
                          handleReady(this.state.numberOfPlayers)
                          this.handleNext()
                        } else {
                          this.props.router.push('/scores')
                        }
                      }
                      }
                    >{stepIndex === 1 ? 'Finish' : 'Next'}</button>
                  </div>
                </div>
          </div>
        </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  handleSubmit(playerArray) {
    dispatch(addPlayersAction(playerArray))
  },
  handleReady(numberOfPlayers) {
    dispatch(addPlayersAction(makePlayers(numberOfPlayers)))
  },
  handleNameChange(player) {
    dispatch(playerNamesAction(player))
  }
})

const mapState = (state) => ({
  players: state.players
})

const PlayerScreenContainer = connect(mapState, mapDispatch)(PlayerScreen)

export default PlayerScreenContainer
