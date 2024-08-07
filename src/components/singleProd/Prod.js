import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Navbar from '../Navbar/Navbar';
import { Button } from "@mui/material";
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../context/cart';

const Prod = () => {
  const { id } = useParams();
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("Id");
  const [data, setData] = useState([]);
  const { totalPrice, addToCart, carts, setCarts } = useContext(CartContext);
  const navigate = useNavigate();

  const addTocart = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/prod/cart/${id}`, {
        userId: userId
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json"
        }
      });

      if (res.status === 201) {
        console.log(res.data)
        const updatedCart = res.data.updatedCart;
        console.log(updatedCart)
        setCarts((prev) => [...prev, updatedCart]);
        
        
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:7000/api/Prod/Product/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });
        setData(res.data.Products); 
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    getProducts();
  }, [id, userToken]);

  return (
    <div>
      <Navbar />
      <div className='swiper_main_container' style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
        {
          data.map((product) => (
            <Swiper
              key={product._id}
              effect='coverflow'
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: '.swiper-pagination', clickable: true }}
              navigation={{
                nextEl: '.swiper_button_next',
                prevEl: '.swiper_button_prev',
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className='swiper_container'
            >
              <SwiperSlide className='swiper-slide'>
                <img src={product.Photo1} height={300} width={300} alt='Product' />
              </SwiperSlide>
              <SwiperSlide className='swiper-slide'>
                <img src={product.Photo2} height={300} width={300} alt='Product' />
              </SwiperSlide>
              <SwiperSlide className='swiper-slide'>
                <img src={product.Photo3} height={300} width={300} alt='Product' />
              </SwiperSlide>
              <SwiperSlide className='swiper-slide'>
                <img src={product.Photo4} height={300} width={300} alt='Product' />
              </SwiperSlide>
              <div className='slider-controller'>
                <div className='swiper_button_prev slider-arrow'>
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <div className='swiper_button_next slider-arrow'>
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
                <div className='swiper-pagination'></div>
                <h2>{product.Description}</h2>
                <p>Previous Price: ₹{product.PrevPrice}</p>
                <p>Price: ₹{product.Price}</p>
                <p>Stock: {product.Stock}</p>
              </div>
            </Swiper>
          ))
        }
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px"
          }}
        >
          <Button size="medium"
            variant='contained'
            sx={{
              padding: "10px 15px"
            }}
            onClick={addTocart}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: "400",
                boxSizing: "border-box",
                color: "black"
              }}
            >
              Add To Cart
            </span>
          </Button>
          <Button size="medium" variant='contained'
            sx={{
              padding: "10px 15px"
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Prod;
