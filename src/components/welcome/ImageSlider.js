import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import { FitScreen } from '@mui/icons-material';

import unsplash from './assets/unsplash.jpg'
const ImageSlider = () => {
  const slideshowImages = [
    {
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',  // Direct link to an image
        caption: "one"
    },
    {
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',  // Direct link to an image
        caption: "two"
    },
    {
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',  // Direct link to an image
        caption: "three"
    },
    {
        url: unsplash,  
        caption: "hello"
    }
  ];

  return (
    <div className='slide-container'>
      <Fade>
        {slideshowImages.map((image, index) => (
          <div key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "600px",
                width:"100%",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${image.url})`,
                
            }}
            >
              <span
                style={{
                  fontSize: "10px",
                  color: "black",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  padding: "2px 5px",
                  borderRadius: "5px"
                }}
              >
                {image.caption}
              </span>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default ImageSlider;
