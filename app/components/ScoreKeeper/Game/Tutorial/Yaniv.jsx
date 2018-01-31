import React, {Component} from 'react'
import CardElement, {BackOfCard} from './CardElement'

export default class Yaniv extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: 'Call Yaniv, or hold off?'
    }
  }

  handLowEnough(number){
    if (number > 7) {
      this.setState({message: `You have ${number} in your hand, you need 7 or less for Yaniv.`})
    } else {
      return true;
    }
    return false
  }

  handleHoldOff(number){
    if (number > 7) {
      this.setState({message: `Correct. ${number} isn't low enough to call Yaniv.`})
    } else if (number > 3) {
      this.setState({message: `${number}. Strategic. Your opponent could have a lower hand.`})
    } else {
      this.setState({message: `${number}. Strategic. You're trying to Assaf or not be Assaf'd.`})
    }
  }

  handleYaniv(){
    this.setState({message: 'Yaniv. You win.'})
  }

  handleAssaf(user, opponent){
    this.setState({message: `You have ${user}. Opponent has ${opponent}. You got Assaf'd. ${user + 30} points added to your score.`})
  }

  render(){
    const {game} = this.props
    const dealtCards = game.getSmallHand()
    const userHand = [dealtCards[0]]
    const opponentHand = [dealtCards[1]]
    const deck = game.deck
    return (
      <div id={'start'} className={'container makeColumn'}>
      <div className={'container makeColumn felt'}>
      <div className={'container makeColumn'}>
      <h1>{this.state.message}</h1>
        <div className="container">
          {userHand.map(cardId => {
            return <CardElement key={game.round + 'u' + cardId} props={deck[cardId]} />
          })}

          </div>
          <div className="buttonGroup">
          <button
          onClick={ () => {
            if (this.handLowEnough(game.handTotal(userHand))) {
              if (game.handTotal(userHand) < game.handTotal(opponentHand)) {
                this.handleYaniv()
              } else {
                this.handleAssaf(game.handTotal(userHand), game.handTotal(opponentHand))
              }
            }

          }}
          className="homeButton">call yaniv</button>
          <button
            onClick={() => {
              this.handleHoldOff(game.handTotal(userHand))
            }}
            className="homeButton">hold off</button>
          </div>
        </div>
        <div className={'container makeColumn'}>
            <h1>Opponent's Hand</h1>
            <div className="userHand">
          {opponentHand.map(cardId => {
            return <CardElement key={game.round + 'o' + cardId} props={deck[cardId]} />
          })}
            </div>
        </div>
      </div>
     </div>
    )
  }
}
