import React from 'react'
import Navbar from '../Navbar/Navbar'

import './cart.css'
import LeftCart from './LeftCart'
import PaymentCart from './PaymentCart'
const Cart = () => {
  return (
    <div className='carts-container'>
        <Navbar />
        <div className='main-prods'>
            <div className='left-prods'>
                    <LeftCart />
            </div>
            <div className='payment-data'>
                    <PaymentCart />
            </div>
        </div>
        </div>
      
  )
}

export default Cart
