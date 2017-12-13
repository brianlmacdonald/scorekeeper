import React, { Component } from 'react'
import { TextField, RaisedButton, SelectField, MenuItem, FlatButton} from 'material-ui'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { connect } from 'react-redux'
import { addPlayersAction, playerNamesAction } from '../../../store'
import { Link } from 'react-router'
require('css-loader!../../../styles.css')

import {makePlayers} from './gameFunctions'

class PlayerScreen extends Component {
  constructor(){
    super()
    this.state = {
      numberOfPlayers: 2,
      finished: false,
      stepIndex: 0
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.numberSelect = this.numberSelect.bind(this)
    this.names = this.names.bind(this)
    this.ready = this.ready.bind(this)
    this.error = this.error.bind(this)
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleSelect(evt, idx, val) {
    this.setState({numberOfPlayers: val})

  }

  ready() {
    return(
      <p>Got names, time to play</p>
    )
  }

  error() {
    return(
      <p>uh oh.</p>
    )
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.numberSelect;
      case 1:
        return this.names;
      case 2:
        return this.ready;
      default:
        return this.error;
    }
  }

  numberSelect(){
    return (<div>
      <SelectField
        floatingLabelText='number of players'
        value={this.state.numberOfPlayers}
        onChange={this.handleSelect}
        >
        <MenuItem value={2} primaryText='two' />
        <MenuItem value={3} primaryText='three' />
        <MenuItem value={4} primaryText='four' />
        <MenuItem value={5} primaryText='five' />
      </SelectField>
    </div>)
  }

  names(handleNameChange){
    return (<div id='nameEntry'>
      {this.props.players.length && this.props.players.map(player => {
        return <TextField
          key={player.id}
          hintText={`Player${player.id}'s name?`}
          onChange={(evt) => {
            player.name = evt.target.value
            handleNameChange(player)
          }}
        />
      })}
    </div>)
  }

  render(){
    const {handleReady, handleNameChange} = this.props
    const {finished, stepIndex} = this.state
    const contentStyle = { margin: '0 16px' };

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Number Of Players</StepLabel>
            </Step>
            <Step>
              <StepLabel>Name Players</StepLabel>
            </Step>
            <Step>
              <StepLabel>Go to Score Screen</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {finished ? (
              <div>
                <RaisedButton
                  label='continue'
                  containerElement={<Link to='/scores' />}
                />
              </div>) : (
                <div>
                  <div>{this.getStepContent(stepIndex)(handleNameChange)}</div>
                  <div style={{ marginTop: 12 }}>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                      style={{ marginRight: 12 }}
                    />
                    <RaisedButton
                      label={stepIndex === 2 ? 'Finish' : 'Next'}
                      primary={true}
                      onClick={() => {
                        this.handleNext()
                        if (!stepIndex) handleReady(this.state.numberOfPlayers) 
                      }
                      }
                    />
                  </div>
                </div>
              )}
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
