import React, { useState } from 'react'
import './FlipWrapper.css'

const FlipWrapper = ({ children }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const loginComponent = children[0]
  const signupComponent = children[1]

  const loginWithProps = React.cloneElement(loginComponent, {
    onSwitchToSignup: () => setIsFlipped(true)
  })

  const signupWithProps = React.cloneElement(signupComponent, {
    onSwitchToLogin: () => setIsFlipped(false)
  })

  return (
    <div className="flip-wrapper">
      <div className={`flip-wrapper-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-wrapper-front">
          {loginWithProps}
        </div>
        <div className="flip-wrapper-back">
          {signupWithProps}
        </div>
      </div>
    </div>
  )
}

export default FlipWrapper