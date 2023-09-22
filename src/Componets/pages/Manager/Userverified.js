import React from 'react'
import './Userverfied.css'

const Userverified = () => {
  return (
    <div className="verification-message-container">
    <div className="verification-message">
      <h2 className="message-title">Account Verification</h2>
      <p className="message-text">
        Your account has been verified and is now awaiting admin approval.
      </p>
      <p className="message-text">
        You will be notified shortly once your account is activated.
      </p>
    </div>
  </div>
  )
}

export default Userverified