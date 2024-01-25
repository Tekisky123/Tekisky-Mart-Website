import React from 'react';
import { Link } from 'react-router-dom';

const BestSallerShowCase = ({ imgSrc, title, rating, description, price, originalPrice, soldCount, availableCount, days, hours, minutes, seconds }) => {
  return (
    <div className="showcase-container">
      <div className="showcase">
        <div className="showcase-banner">
          <img src={imgSrc} alt={title} className="showcase-img" />
        </div>

        <div className="showcase-content">
          <div className="showcase-rating">{rating}</div>

          <h3 className="showcase-title">
            <Link>{title}</Link>
          </h3>

          <p className="showcase-desc">{description}</p>

          <div className="price-box">
            <p className="price">{price}</p>
            <del>{originalPrice}</del>
          </div>

          <button className="add-cart-btn">add to cart</button>

          <div className="showcase-status">
            {/* <div className="wrapper">
              <p>
                already sold: <b>{soldCount}</b>
              </p>
              <p>
                available: <b>{availableCount}</b>
              </p>
            </div> */}
            {/* <div className="showcase-status-bar"></div> */}
          </div>

          {/* <div className="countdown-box">
            <p className="countdown-desc">Hurry Up! Offer ends in:</p>

            <div className="countdown">
              <div className="countdown-content">
                <p className="display-number">{days}</p>
                <p className="display-text">Days</p>
              </div>
              <div className="countdown-content">
                <p className="display-number">{hours}</p>
                <p className="display-text">Hours</p>
              </div>
              <div className="countdown-content">
                <p className="display-number">{minutes}</p>
                <p className="display-text">Min</p>
              </div>
              <div className="countdown-content">
                <p className="display-number">{seconds}</p>
                <p className="display-text">Sec</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BestSallerShowCase;
