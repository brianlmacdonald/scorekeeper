import React, {Component} from 'react'
import { connect } from 'react-redux'
import { updateScoreAction } from 'APP/app/store'
import { Link } from 'react-router'


const noDecimal = (number) => {
  return number.split('.').length === 1
}

const notTooBig = (number, bool) => {
  if (bool) {
    return Math.abs(Number(number)) < 202
  } else {
    return Number(number) > -1 && Number(number) < 7
  }
}

const validateNumber = (number, bool = true) => {
    return noDecimal(number) && notTooBig(number, bool)

}
class EditPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      score: this.props.players[this.props.params.playerId - 1].score,
      wins: this.props.players[this.props.params.playerId - 1].wins,
      warningScore: false,
      warningWins: false
    }
    this.handleScore = this.handleScore.bind(this)
    this.handleWins = this.handleWins.bind(this)
  }

  handleWarningWins(bool){
    this.setState({warningWins: bool})
  }

  handleWarningScore(bool){
    this.setState({warningScore: bool})
  }

  handleScore(value){
    if (validateNumber(value)) {
      this.handleWarningScore(false)
      this.setState({score: Number(value)})
    } else {
      this.handleWarningScore(true)
    }
  }

  handleWins(value){
    if (validateNumber(value, false)) {
      this.handleWarningWins(false)
      this.setState({wins: Number(value)})
    } else {
      this.handleWarningWins(true)
    }
  }

  render(){
    const {handleSave, players} = this.props
    const activeWarning = this.state.warningScore || this.state.warningWins
    const player = players.find(person => {
      return person.id === Number(this.props.params.playerId)
    })
    if (player) {
      return (
        <div className={'container makeColumn'}>
          <h1 className="editLabel">{player.name}</h1>
          <form className={'container makeColumn'}>
            <label className="editLabel">score</label>
            <input
            placeholder={this.state.score}
            className="editInput"
            onChange={(evt) => {
              if (!isNaN(Number(evt.target.value))) {
                this.handleWarningScore(false)
                this.handleScore(evt.target.value)
              } else {
                this.handleWarningScore(true)
              }
            }} />
            <label
              className="editLabel"
              >wins</label>
            <input
              placeholder={this.state.wins}
              className="editInput"
              onChange={(evt) => {
                if (!isNaN(Number(evt.target.value))) {
                  this.handleWarningWins(false)
                  this.handleWins(evt.target.value)
                } else {
                  this.handleWarningWins(true)
                }
            }} />
            <div className="container">
            <Link
            to="/scores">
              <button
                disabled={activeWarning}
                className="homeButton"
                onClick={() => {
                player.score = this.state.score
                player.wins = this.state.wins
                handleSave(player)
              }}>save</button>
            </Link>
            <Link to="/scores">
              <button
              className="homeButton"
              >cancel</button>
            </Link>
            </div>
          </form>
          <div className={'container makeColumn'}>
          <div className={!activeWarning ?
                          'hidden' :
                          'container makeColumn red'}>
                          Invalid input.</div>
        </div>
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
