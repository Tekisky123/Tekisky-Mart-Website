import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment index or loop back to the beginning
      setCurrentIndex(prevIndex => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    }, 2000); // Adjust the interval for automatic scrolling

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [banners.length]);

  useEffect(() => {
    // Scroll to the next slide
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * currentIndex;
      sliderRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  }, [currentIndex]);

  return (
    <div className="banner">
      <div className="container">
        <div className="slider-container has-scrollbar" ref={sliderRef}>
          {banners.map((banner, index) => (
            <div className="slider-item" key={index}>
              <img src={banner.imgSrc} alt={banner.subtitle} className="banner-img" />
              <div className="banner-content">
                <p className="banner-subtitle">{banner.subtitle}</p>
                <h4 className="banner-title">{banner.title}</h4>
                <p className="banner-text">
                  starting at ₹ <b>{banner.price}</b>
                </p>
                <Link to={banner.link} className="banner-btn">
                  Shop now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
