import React from 'react'

export default function SpeechBubble({text}){
  return (<div className="speechBubbleContainer">
          <div className="speechBubble"><p className="speechText">{text}</p></div>
          <div className="mediumBubble" />
          <div className="smallBubble" />
        </div>)
}
