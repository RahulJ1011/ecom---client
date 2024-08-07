import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import "./history.css"
import { Link } from 'react-router-dom'
const History = () => {
    
  return (
    <div>
      <Navbar />
      <div className='history-container'>
        <div className='history-wrapper'>
        <div className='history-title'>
            <h4>Your Orders</h4>
          
        </div>
        <div className='history-content'>
            <h5 className='tags'>Orders</h5>
            <h5 className='tags'>Mode of Payment</h5>
            <h5 className='tags'>Price</h5>
        </div>

        </div>
      </div>
    </div>
  )
}

export default History
