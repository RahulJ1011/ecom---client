import React from 'react'

const Sucess = () => {
    const userName = localStorage.getItem("userName");
  return (
    <div>
      <div>
        <h1>
            Hello {userName}
        </h1>
        <h5>
            Your Order is placed sucessfully
        </h5>
      </div>
    </div>
  )
}

export default Sucess
