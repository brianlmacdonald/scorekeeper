import React, { Component } from 'react'
import { RadioButton, Paper, TextField, RaisedButton, SelectField, MenuItem} from 'material-ui'
import { connect } from 'react-redux'
import { addPlayersAction, playerNamesAction } from '../../../store'
import { Link } from 'react-router'
require('css-loader!../../../styles.css')

import {makePlayers} from './gameFunctions'

class PlayerScreen extends Component {
  constructor(){
    super()
    this.state = {
      numberOfPlayers: 2
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(evt, idx, val) {
    this.setState({numberOfPlayers: val})

  }

  render(){
    const {handleReady, handleNameChange} = this.props
    return (
      <div>
        <div>
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
        <RaisedButton
            onClick={() => {
              handleReady(this.state.numberOfPlayers)
            }}
            label='names'
          />
        </div>
        <div id='nameEntry'>
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
        </div>
        <RaisedButton
        label='continue'
        containerElement={<Link to='/scores' />}  
        />
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
