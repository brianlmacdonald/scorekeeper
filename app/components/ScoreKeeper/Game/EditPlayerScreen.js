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
      warning: null,
      numberWarning: null
    }
    this.handleScore = this.handleScore.bind(this)
    this.handleWins = this.handleWins.bind(this)
  }

  handleWarning(entry){
    this.setState({warning: entry})
  }

  handleNumberWarning(number) {
    this.setState({numberWarning: number})
  }

  handleScore(value){
    if (validateNumber(value)) {
      this.handleNumberWarning(null)
      this.setState({score: Number(value)})
    } else {
      this.handleNumberWarning(value)
    }
  }

  handleWins(value){
    if (validateNumber(value, false)) {
      this.handleNumberWarning(null)
      this.setState({wins: Number(value)})
    } else {
      this.handleNumberWarning(value)
    }
  }

  render(){
    console.log(this.state)
    const {handleSave, players} = this.props
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
              if (Number(evt.target.value)) {
                this.handleWarning(null)
                this.handleScore(evt.target.value)
              } else {
                this.handleWarning(evt.target.value)
              }
            }} />
            <label
              className="editLabel"
              >wins</label>
            <input
              placeholder={this.state.wins}
              className="editInput"
              onChange={(evt) => {
                if (Number(evt.target.value)) {
                  this.handleWarning(null)
                  this.handleWins(evt.target.value)
                } else {
                  this.handleWarning(evt.target.value)
                }
            }} />
            <div className='container'>
            <Link
            to="/scores">
              <button
                disabled={this.state.warning !== null}
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
          <div className={this.state.warning === null ?
                          'hidden' :
                          'container makeColumn red'}>
                          Hey, things like 'cheese', 
                           '{this.state.warning}', 
                          and 'cookies' are not numbers.</div>
        <div className={this.state.numberWarning === null ?
                        'hidden' :
                        'container makeColumn red'}>
                        Hey, {this.state.numberWarning} is either too big, 
                        too small, too decimally, or too negative. Fix it.
        </div>
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
