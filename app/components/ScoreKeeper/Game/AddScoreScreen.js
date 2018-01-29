import React, { Component } from 'react';
import { connect } from 'react-redux'
import {RaisedButton, Paper} from 'material-ui'
import { updateScoreAction, resetCheckedAction } from '../../../store'
import {calculateScore} from './gameFunctions'
import { Link } from 'react-router'
import ScoreScreen from './ScoreScreen'

class AddScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      jokers: 0,
      yaniv: false,
      assaf: false,
      cards: []
    }
    this.reset = this.reset.bind(this)
    this.cardKey = this.cardKey.bind(this)
  }

  cardKey(card){
    return (
      <button
className="cardButton"
      onClick={(evt) => {
        evt.preventDefault()
        if (card.name === `\uD83C\uDCCF` && this.state.jokers < 2) this.setState({jokers: this.state.jokers + 1})
        this.setState({total: this.state.total + card.value})
        this.setState({cards: [...this.state.cards, card.name + ' - ']})
      }}
      >{card.name}</button>
    )
  }

  assaf(){
    return (
      <button
      className="cardButton"
      disabled={this.state.yaniv}
      onClick={(evt) => {
        evt.preventDefault()
        this.setState({assaf: !this.state.assaf})}}
      >asaf'd</button>
    )
  }

  yaniv() {
    return (
      <button
        className="cardButton"
        disabled={this.state.assaf}
        onClick={(evt) => {
          evt.preventDefault()
          this.setState({ yaniv: !this.state.yaniv }) }}
      >winner</button>
    )
  }

  reset() {
    this.setState({ total: 0 })
    this.setState({ jokers: 0 })
    this.setState({ yaniv: false })
    this.setState({ assaf: false })
    this.setState({cards: []})
  }

  render() {
    const {handleDone, handleBackToScores, players, router} = this.props
    const currentPlayer = players.find(player => !player.checked)
    if (currentPlayer) {
      return (
        <div className={'container makeColumn'}>
          <Paper className="paperName">
          <div className='container'>
          <div className='scoringContainer'>
            <h4 className="paperH4">{currentPlayer.name}</h4>
            <h4 className="paperH4">{this.state.total}</h4>
            <h4 className="paperH4">{`\uD83C\uDCCF`.repeat(this.state.jokers)}</h4>
            <h4 className="paperH4">{this.state.yaniv ? 'winner' : 'loser'}</h4>
            </div>
            <div className='scoreCardsContainer'>
            <p>{this.state.cards}</p>
            </div>
            </div>
          </Paper>
          <div className="addContainer">
            {this.cardKey({name: 'K', value: 10})}
            {this.cardKey({name: 'Q', value: 10})}
            {this.cardKey({name: 'J', value: 10})}
            {this.cardKey({name: '10', value: 10})}
          </div>
          <div className="addContainer">
            {this.cardKey({name: '9', value: 9})}
            {this.cardKey({name: '8', value: 8})}
            {this.cardKey({name: '7', value: 7})}
            {this.cardKey({name: '6', value: 6})}
          </div>
          <div className="addContainer">
            {this.cardKey({name: '5', value: 5})}
            {this.cardKey({name: '4', value: 4})}
            {this.cardKey({name: '3', value: 3})}
            {this.cardKey({name: '2', value: 2})}
          </div>
          <div className="addContainer">
            {this.assaf()}
            {this.cardKey({ name: 'A', value: 1 })}
            {this.cardKey({ name: `\uD83C\uDCCF`, value: 0 })}
            {this.yaniv(currentPlayer)}
          </div>
          <div className="addContainer">
          <button
          className="cardButton"
          onClick={(evt) => {
            evt.preventDefault()
            this.reset()
          }}
          >reset</button>
          <button
          className="cardButton"
          onClick={(evt) => {
            evt.preventDefault()
            if (this.state.yaniv) currentPlayer.wins++
            else currentPlayer.wins = 0
            currentPlayer.score += calculateScore(this.state)
            handleDone(currentPlayer)
            this.reset()
          }}
          >done</button>
          </div>
      </div>)
    } else {
      return (<ScoreScreen />)
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
  handleBackToScores(history){
    history.push('/scores')
  },
  resetPlayers(){
    dispatch(resetCheckedAction())
  }
})

const AddScoreContainer = connect(mapStateToProps, mapDispatchToProps)(AddScore)
export default AddScoreContainer;
