import React from 'react'

const Cancel = () => {
    const userName = localStorage.getItem("userName");

  return (
    <div>
      <div>
        <h1>
            Hello {userName}
        </h1>
        <h5>
            Sorry Your Order is cancelled, Try Again
        </h5>
      </div>
    </div>
  )
}

export default Cancel
