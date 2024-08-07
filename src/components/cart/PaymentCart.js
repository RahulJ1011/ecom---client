import { Container, Typography ,Box,Button, Rating} from '@mui/material'
import React, { useContext } from 'react'
import unsplash3 from './assets/unsplash3.jpg'
import { CartContext } from '../../context/cart'

const PaymentCart = () => {
    const {totalPrice} = useContext(CartContext)
  return (
   <Container sx={{
    display:"flex",
    flexDirection:"column",
    gap:"30px",
    marginTop:"25px"
    
   }}>
    <Box sx={{
        marginTop:"10px",
        padding:"20px",
        boxShadow:
        "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",

    }}>
        <Typography>
            items selected
        </Typography>
        <Typography>
            Subtotal (i item): {totalPrice()}
        </Typography>
        <Button variant='contained'
        sx={{
            backgroundColor:"#cd9042",
            color:"black",
            marginTop:"10px"
        }}>
            Proceed to Buy
        </Button>
    </Box>
    <Box sx={{
        boxShadow:        "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
       padding:"10px",
       
    }}>
        <Typography variant='h6'>
            You might also like
        </Typography>
        <Box  sx={{
             display:"flex",
             

        }}>
            <img src={unsplash3} height={75} width={75} style={{
                cursor:'pointer'
            }} />
            <Box>
                <Typography  variant='p'>
                FONOKASE Bass BOOOM Pro with Stereo Sound,Wired Earphones with 3.5 mm Jack,

                </Typography>
                <Rating 

                value={4}
                />
                <Typography>
                    13,000.00
                </Typography>
            </Box>
        </Box>
    </Box>
   </Container>
  )
}

export default PaymentCart
