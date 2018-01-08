import React from 'react'

const TutorialButton = ({props}) => {
  return (
    <button
      className="homeButton"
      onClick={() => {
        props.handler()
      }}
      >{props.name}
    </button>
  )

}

export default TutorialButton
