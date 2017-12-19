import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateScoreAction } from '../../../store'
import { Link } from 'react-router'

class EditPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      score: this.props.players[this.props.params.playerId - 1].score,
      wins: this.props.players[this.props.params.playerId - 1].wins
    }
    this.handleScore = this.handleScore.bind(this)
    this.handleWins = this.handleWins.bind(this)
  }

  handleScore(value){
    this.setState({score: value})
  }

  handleWins(value){
    this.setState({wins: value})
  }

  render(){
    console.log(this)
    const {handleSave, players} = this.props
    console.log(this.state)
    const player = players.find(person => {
      return person.id === Number(this.props.params.playerId)
    })
    if (player) {
      return (
        <div className='container'>
          <h1 className='editLabel'>{player.name}</h1>
          <form className='container'>
            <label className='editLabel'>score</label>
            <input
            placeholder={this.state.score}
            className='editInput'
            onChange={(evt) => {
              this.handleScore(evt.target.value)
            }} />
            <label
              className='editLabel'
              >wins</label>
            <input
              placeholder={this.state.wins}
              className='editInput'
              onChange={(evt) => {
              this.handleWins(evt.target.value)
            }} />
            <Link
            to='/scores'>
              <button
                className='homeButton'
                onClick={() => {
                player.score = this.state.score
                player.wins = this.state.wins
                console.log(player)
                handleSave(player)
              }}>save</button>
            </Link>
            <Link to='/scores'>
              <button
              className="homeButton"
              >cancel</button>
            </Link>
          </form>
        </div>
      )
    } else {
      return <div>!!!</div>
    }
  }
}

const mapState = (state) => ({
  players: state.players
})

const mapDispatch = (dispatch) => ({
  handleSave(player) {
    dispatch(updateScoreAction(player))
  }
})

const EditPlayerScreenContainer = connect(mapState, mapDispatch)(EditPlayer)
export default EditPlayerScreenContainer;
