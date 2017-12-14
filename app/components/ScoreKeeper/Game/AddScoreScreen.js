import React, { Component } from 'react';
import { connect } from 'react-redux'
import {RaisedButton} from 'material-ui'
import { updateScoreAction, resetCheckedAction } from '../../../store'
import {calculateScore} from './gameFunctions'
import { Link } from 'react-router'

class AddScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      jokers: 0,
      yaniv: false,
      assaf: false,
    }
    this.reset = this.reset.bind(this)
    this.cardKey = this.cardKey.bind(this)
  }

  cardKey(card){
    return (
      <RaisedButton
      label={card.name}
      onClick={() => {
        if (card.name === `\uD83C\uDCCF` && this.state.jokers < 2) this.setState({jokers: this.state.jokers + 1})
        this.setState({total: this.state.total + card.value})
      }}
      />
    )
  }

  assaf(){
    return (
      <RaisedButton
      label= 'asaf'
      disabled={this.state.yaniv}
      onClick={() => {this.setState({assaf: !this.state.assaf})}}
      />
    )
  }

  yaniv() {
    return (
      <RaisedButton
        label='yaniv'
        disabled={this.state.assaf}
        onClick={() => { this.setState({ yaniv: !this.state.yaniv }) }}
      />
    )
  }

  reset() {
    this.setState({ total: 0 })
    this.setState({ jokers: 0 })
    this.setState({ yaniv: false })
    this.setState({ assaf: false })
  }

  render() {
    const {handleDone, handleBackToScores, players} = this.props
    const currentPlayer = players.find(player => !player.checked)
    console.log(this.props.players)
    if (currentPlayer) {
      return (
        <div>
          <h2>{currentPlayer.name}</h2>
          <div>
            {this.cardKey({name: 'K', value: 10})}
            {this.cardKey({name: 'Q', value: 10})}
            {this.cardKey({name: 'J', value: 10})}
            {this.cardKey({name: '10', value: 10})}
          </div>
          <div>
            {this.cardKey({name: '9', value: 9})}
            {this.cardKey({name: '8', value: 8})}
            {this.cardKey({name: '7', value: 7})}
            {this.cardKey({name: '6', value: 6})}
          </div>
          <div>
            {this.cardKey({name: '5', value: 5})}
            {this.cardKey({name: '4', value: 4})}
            {this.cardKey({name: '3', value: 3})}
            {this.cardKey({name: '2', value: 2})}
          </div>
          <div>
            {this.assaf()}
            {this.cardKey({ name: 'A', value: 1 })}
            {this.cardKey({ name: `\uD83C\uDCCF`, value: 0 })}
            {this.yaniv(currentPlayer)}
          </div>
          <RaisedButton
          label='done'
          onClick={() => {
            if (this.state.yaniv) currentPlayer.wins++
            else currentPlayer.wins = 0
            currentPlayer.score += calculateScore(this.state)
            handleDone(currentPlayer)
            this.reset()
          }}
          />
      </div>)
    } else {
      return <RaisedButton
              label='back to scores'
              onClick={() => {
                handleBackToScores()
              }}
              containerElement={<Link to='/scores' />}
              />
    }
  }
}

const mapStateToProps = (state) => ({
  players: state.players,
  rules: state.rules
})

const mapDispatchToProps = (dispatch) => ({
  handleDone(player){
    player.checked = true
    dispatch(updateScoreAction(player))
  },
  handleBackToScores(){
    dispatch(resetCheckedAction())
  }
})

const AddScoreContainer = connect(mapStateToProps, mapDispatchToProps)(AddScore)
export default AddScoreContainer;