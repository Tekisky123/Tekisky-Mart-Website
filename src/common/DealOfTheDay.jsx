import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Assets/Styles/SingleProduct.css';
import "../App.css";

const DealOfTheDay = () => {
  const [products, setProducts] = useState([]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Fetch data from the API
    fetch('https://tekiskymart.onrender.com/admin/getproduct')
      .then(response => response.json())
      .then(data => {
        // Filter products with "dealOfDay" set to true
        const dealOfDayProducts = data.products.filter(product => product.dealOfDay);

        // Set the filtered products to the state
        setProducts(dealOfDayProducts);
      })
      .catch(error => console.error('Error fetching data:', error));

    // Set up the countdown timer
    const saleEndDate = new Date(); // Set your sale end date here
    saleEndDate.setDate(saleEndDate.getDate() + 1);

    const countdownInterval = setInterval(() => {
      const now = new Date();
      const timeDifference = saleEndDate - now;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(countdownInterval);
  }, []);

  // If there's only one product, skip rendering the slider
  if (products.length === 1) {
    const product = products[0];
    return (
      <div className="deal-of-the-day-slider container single-product">
        <div className="slider2-item">
          <img src={product.imageURL[0]} alt={product.productName} className='slider2-image' />

          <div className="product-details">
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p>MRP: <del> ₹{product.mrp}</del></p>
            <p>Offer Price: ₹{product.offerPrice}</p>

            <Link to={`/single-product/${product._id}`}>
              <button className='add-cart-btn-cards'>Buy Now</button>
            </Link>
            <div className="countdown-timer">
          <p className="countdown-label">Sale Ends In:</p>
          <div className="countdown">
          <div className="countdown-item">{countdown.days} <span>days</span></div>
            <div className="countdown-item">{countdown.hours} <span>hours</span></div>
            <div className="countdown-item">{countdown.minutes} <span>minutes</span></div>
            <div className="countdown-item">{countdown.seconds} <span>seconds</span></div>
          </div>
        </div>
          </div>
        </div>
        
      </div>
    );
  }

  // If there are multiple products, render the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="deal-of-the-day-slider container">
      <Slider {...sliderSettings}>
        {products.map(product => (
          <div key={product._id} className="slider2-item">
            <img src={product.imageURL[0]} alt={product.productName} className='slider2-image' />

            <div className="product-details">
              <h3>{product.productName}</h3>
              <p>{product.description}</p>
              <p>MRP: <del> ₹{product.mrp}</del></p>
              <p>Offer Price: ₹{product.offerPrice}</p>

              <Link to={`/single-product/${product._id}`}>
                <button className='add-cart-btn-cards'>Buy Now</button>
              </Link>
              <div className="countdown-timer ">
        <p className="countdown-label">Sale Ends In:</p>
        <div className="countdown">
        <div className="countdown-item">{countdown.days} <span>days</span></div>
            <div className="countdown-item">{countdown.hours} <span>hours</span></div>
            <div className="countdown-item">{countdown.minutes} <span>minutes</span></div>
            <div className="countdown-item">{countdown.seconds} <span>seconds</span></div>
        </div>
      </div>
            </div>
          </div>
        ))}
      </Slider>
     
    </div>
  );
};

export default DealOfTheDay;
