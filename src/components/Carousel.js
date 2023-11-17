import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function  ImageCarousel() {
  return (
    <Carousel>
      <div>
        <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Image 1" />
      </div>
      <div>
        <img src="https://plus.unsplash.com/premium_photo-1677444204870-bdbd42b1fc6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" alt="Image 2" />
      </div>
      <div>
        {/* <img src="https://via.placeholder.com/400x200?text=Image+3" alt="Image 3" /> */}
      </div>
    </Carousel>
  );
}

export default ImageCarousel;
