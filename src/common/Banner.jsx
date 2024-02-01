import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ banners }) => {
  return (
    <div className="banner">
      <div className="container">
        <div className="slider-container has-scrollbar">
          {banners.map((banner, index) => (
            <div className="slider-item" key={index}>
              <img src={banner.imgSrc} alt={banner.subtitle} className="banner-img" />
              <div className="banner-content">
                <p className="banner-subtitle">{banner.subtitle}</p>
                <h2 className="banner-title">{banner.title}</h2>
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
