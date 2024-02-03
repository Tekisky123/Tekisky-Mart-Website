// Import necessary dependencies
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Assets/Styles/SingleProduct.css"; // Import the CSS file
import { Context } from "../common/Context";

// SingleProduct component
const SingleProduct = () => {
  const navigate = useNavigate();

  const {
    handleAddToCart,
    ToastContainer,
    quantity,
    handleSingleProductQuantity,
    singleItems,
    handleSingleCheckout,
    setSingleItems,
    setSingleSavedAmount,
    setSingleSubTotal,
    setSingleDeliveryCharge,
    setSingleGrandTotal,
  } = useContext(Context);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, id]);

  // State to store product data
  const [product, setProduct] = useState(null);
  // State to manage quantity

  // Effect to fetch product data based on the product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://tekisky-mart.onrender.com/admin/getoneproduct/${id}`
        );
        setProduct(response?.data?.getOneProduact);

        setSingleItems({
          ...singleItems,
          product: response?.data?.getOneProduact,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    handleSingleProductQuantity("inc", product);
  }, []);

  useEffect(() => {
    let singleSubTotal = 0;
    let singleSavedAmount = 0;
    let quantity = singleItems?.quantity ? singleItems?.quantity : 1;

    const itemSubTotal = singleItems?.product?.offerPrice * quantity;
    singleSubTotal += itemSubTotal;
    singleSavedAmount +=
      (singleItems?.product?.mrp - singleItems?.product?.offerPrice) * quantity;


      const deliveryCharge = singleSubTotal < 500 ? 30 : 0;
      const grandTotal = singleSubTotal + deliveryCharge;

    setSingleGrandTotal(grandTotal)
    setSingleDeliveryCharge(deliveryCharge)
    setSingleSubTotal(singleSubTotal);
    setSingleSavedAmount(singleSavedAmount);


  }, [singleItems]);

  if (!product) {
    return (
      <div className="product-container loader-product-container">
        <div className="preloader">
          <svg
            className="cart"
            role="img"
            aria-label="Shopping cart line animation"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="8"
            >
              <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                <circle cx="43" cy="111" r="13" />
                <circle cx="102" cy="111" r="13" />
              </g>
              <g className="cart__lines" stroke="currentColor">
                <polyline
                  className="cart__top"
                  points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                  strokeDasharray="338 338"
                  strokeDashoffset="-338"
                />
                <g className="cart__wheel1" transform="rotate(-90,43,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx="43"
                    cy="111"
                    r="13"
                    strokeDasharray="81.68 81.68"
                    strokeDashoffset="81.68"
                  />
                </g>
                <g className="cart__wheel2" transform="rotate(90,102,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx="102"
                    cy="111"
                    r="13"
                    strokeDasharray="81.68 81.68"
                    strokeDashoffset="81.68"
                  />
                </g>
              </g>
            </g>
          </svg>
          <div className="preloader__text">
            <p className="preloader__msg">Bringing you the goods…</p>
            <p className="preloader__msg preloader__msg--last">
              This is taking long. Something’s wrong.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Destructure product data
  const { productName, productDetails, imageURL } = product;

  // Settings for the react-slick carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Auto scroll
    autoplaySpeed: 3000, // Delay between slides in milliseconds (e.g., 3000ms = 3 seconds)
  };

  return (
    <div className="product-container">
      <ToastContainer />
      <div className="image-carousel">
        <Slider {...carouselSettings}>
          {imageURL.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Product ${index + 1}`}
              className="product-image"
            />
          ))}
        </Slider>
      </div>

      <div className="product-details">
        <h1 className="product-name">{productName}</h1>

        <div className="product-info">
          <div className="details-section">
            <h2>Product Details</h2>

            <div>
              <div key={product._id}>
                <p>
                  MRP: <del>₹{product.mrp}</del>
                </p>
                <p>Offer Price: ₹{product.offerPrice}</p>
                <p>
                  Packet Weight: {product.packetweight} {product.unitOfMeasure}
                </p>
                <p>Description: {product.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="buying-section">
          <div className="quantity-section">
            {/* <label htmlFor="quantity" className="quantity-label">Quantity:</label> */}
            <div className="quantity-input-container">
              <label htmlFor="quantity" className="quantity-label">
                Quantity:
              </label>
              <div className="counterDiv">
                <button
                  className="quantity-button"
                  onClick={() => handleSingleProductQuantity("dec", product)}
                >
                  <FaMinus style={{ color: "#0cc1e06" }} />
                </button>
                {/* <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="quantity-input"
              /> */}
                {singleItems ? singleItems?.quantity || 1 : 1}
                <button
                  className="quantity-button"
                  onClick={() => handleSingleProductQuantity("inc", product)}
                >
                  <FaPlus style={{ color: "#0cc1e06" }} />
                </button>
              </div>
            </div>
            <div className="button-div">
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(product, quantity);
                }}
              >
                Add to cart
              </button>
            </div>

            <button
              className="buy-now-button"
              onClick={() => handleSingleCheckout(product)}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
