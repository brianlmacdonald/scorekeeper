import React, {Component} from 'react'
import CardElement from './CardElement'

export default class TutorialSceen extends Component {

  render() {
    const card = {
      name: 'J',
      number: 10,
      suit: `\u2660`,
      dealt: false,
      id: 11

    }
    return (
      <div className="container">
        <div className="felt">
        <CardElement props={card} />
        </div>
        <div className="buttonContainer">
          <button className="homeButton">deal</button>
        </div>
      </div>
    )

  }


}
