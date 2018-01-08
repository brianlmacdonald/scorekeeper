import React, {Component} from 'react'
import ScrollPos from './FACC/ScrollPos'

export default class Overview extends Component {
  
  render(){
    return (
      <div className="testDiv">
        <ScrollPos>
          {
            position => <h1>{position}</h1>
          }
        </ScrollPos>
      </div>
    )
  }
}
