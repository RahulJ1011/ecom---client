import React, { useContext, useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Container, CardHeader, Box } from '@mui/material';
import unsplash from './assets/unsplash.jpg';
import axios from 'axios';
import useAuthStore from '../store/store';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart';

const Todayprods = () => {
  const navigate = useNavigate()
  const [data,SetData] = useState([]);
  const userId = localStorage.getItem("Id")
  const {addToCart,addToHistory} = useContext(CartContext)
  const token = localStorage.getItem("token")
  useEffect(()=>
  {
    const getProducts = async()=>
      {
        try
        {
          const res = await axios.get("http://localhost:7000/api/Prod/getProducts",{
            headers:{
              Authorization:`Bearer ${token}`,
              "Content-Type":"application/json"
            }
          })
          SetData(res.data)
          
        }
        catch(err)
        {
          console.log(err);

        }
      }
      getProducts()
  },[token])
  const addTocart  = async(cartId)=>
    {
      const res = await axios.post(`http://localhost:5000/api/prod/cart/${cartId}`,{userId});
      console.log(res.data);
      addToCart(res.data.updatedCart)
    }
  const handleCheckout = async(prod_id)=>
  {
    try
    {
      const res = await axios.post(`http://localhost:7000/api/prod/checkout/${prod_id}`,
        {},
        {headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"application/json"
        }}
      );
      console.log(res.data)
      
     
      if(res.data.url)
      {
        const prods = res.data.product.Products[0]
        console.log(prods)
        
        const history_add = await axios.post(`http://localhost:5000/api/prod/history/${userId}`,{prods},{
         
        })
       
        addToHistory(history_add.data)
          window.location.assign(res.data.url);
      }

    }
    catch(err)
    {
      console.log(err);

    }
  }
  return (
    <Container
    maxWidth={false}
      sx={{
        margin: "20px 10px",
        padding: " 0 25px",
        display: 'flex',
        width:"90%",
        padding:"15px 20px",
        flexDirection: 'row',
        gap: '30px',
        boxShadow: '0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)',
        width:"100vw"
      }}
    >
      {
        data.map((items)=> (
          <Card
          key={items._id}
        sx={{
          maxWidth: 345
        }}
      >
        <CardMedia
          component="img"
          height="300px"
          image={items.Photo1}
          sx={{
            padding: "10px",
            cursor:"pointer"
          }}
          onClick={(id)=> navigate(`/prod/${items._id}`) }
        />
        <CardHeader
         title='watch'
         >
            {items.Description}
         </CardHeader>
        <CardContent>
         <Typography
         variant='body2'
         color='text.secondary'
         sx={{
            textAlign:"center",
            color:"black",
            fontWeight:"500",
            cursor:"pointer"
         }}
         >
           {`A new nice ${items.Description}`}
         </Typography>
        <Box
        sx={{
          display:"flex",
          gap:"15px",
          justifyContent:"center"
        }}
        >
        <Typography
            
            sx={{
                fontWeight:"bold",
                m:1,
                fontSize:"14px",
                textDecoration:"line-through",
                color:"red",
                marginBottom:"5px"
                
            }}
         >
         {`₹${items.PrevPrice}`}
         </Typography>
         <Typography
            sx={{
                fontWeight:"bold",
                m:1,
                fontSize:"20px",
                color:"green"
            }}
         >
         {`₹${items.Price}`}
         </Typography>
        </Box>
        </CardContent>
        <CardActions>
          <Button size="medium">
           <span
           style={{
            fontSize:"15px",
            fontWeight:"400",
            boxSizing:"border-box",
            color:"black"
           }}
           onClick={() => addTocart(items._id)}
           >
           Add To Cart
           </span>
          </Button>
          <Button size="medium" variant='contained'
          type='button'
          onClick={()=> handleCheckout(items._id)}
          >
            Buy Now
          </Button>
        </CardActions>
      </Card>
        ))
      }

      
    </Container>
  );
}

export default Todayprods;
