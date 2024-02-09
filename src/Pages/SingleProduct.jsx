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
  const { id } = useParams();
  const location = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);

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


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, id]);

  // useEffect(() => {
  //   if (resetQuantity) {
  //     handleSingleProductQuantity("reset", product);
  //     setResetQuantity(false); 
  //   }
  // }, [resetQuantity, location.pathname, id]);

  useEffect(() => {    
    
    singleItems.quantity = 1;

  }, [location.pathname, navigate])


  // Effect to fetch product data based on the product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", id);
        const response = await axios.get(`https://tekiskymart.up.railway.app/product/getoneproduct/${id}`);
        console.log("API Response:", response);
        
        setProduct(response?.data?.getOneProduct);
        setSingleItems({
          ...singleItems,
          product: response?.data?.getOneProduct,
        });
      } catch (error) {
        console.error("Error fetching product:", error.response);
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
            <p className="preloader_msg preloader_msg--last">
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
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
     autoplay: true,
     autoplaySpeed: 3000,
   };
 
   // Handler function to set the selected image index
   const handleImageClick = (index) => {
     setSelectedImageIndex(index);
   };
 
   // JSX for the preview images
   const previewImages = imageURL.map((url, index) => (
     <img
       key={index}
       src={url}
       alt={`Product ${index + 1}`}
       className={`preview-image ${selectedImageIndex === index ? 'selected' : ''}`}
       onClick={() => handleImageClick(index)}
     />
   ));
 
   // JSX for the main slider
   const mainSliderImages = imageURL.map((url, index) => (
     <img
       key={index}
       src={url}
       alt={`Product ${index + 1}`}
       className={`product-image ${selectedImageIndex === index ? 'selected' : ''}`}
     />
   ));
 
   // JSX for the image carousel
   const imageCarousel = (
     <Slider {...carouselSettings}>
       {mainSliderImages}
     </Slider>
   );
 
   return (<>
     <div className="product-container">
       <ToastContainer />
       <div className="image-carousel">
         {imageCarousel}
       <div className="product-preview-images">
         {previewImages}
       </div>
       </div>
 


      <div className="product-details">
        <h1 className="product-name">{productName}</h1>
        <h3>{product.header}</h3>
        <div className="product-info">
          <div className="details-section">
            <h2>Product Details</h2>
           

            <div>
              <div key={product._id}>
                <p>
                  MRP: <del>{product.mrp}₹</del>
                </p>
                <p>Offer Price: {product.offerPrice}₹</p>
                <p>
                  Packet Weight: {product.packetweight} {product.unitOfMeasure}
                </p>
              
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
                  <FaMinus style={{ color: "#004AAD6" }} />
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
                  <FaPlus style={{ color: "#004AAD6" }} />
                </button>
              </div>
            </div>
            <div className="button-div">
              <button
                className="add-to-cart-button"
                onClick={() => {
                  // handleAddToCart(product, quantity);
                  handleAddToCart(product, singleItems?.quantity || 1);
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
      <div className="single-product-details-description"><h1>Description: </h1><p>{product.description}</p>
      <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex px-3 py-4 border border-bottom-0 border-light rounded-top">
              <div className="flex-shrink-0">
                <div className="avatar avatar-sm rounded-circle">
                  <img className="avatar-img" src="https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="" />
                </div>
              </div>
              <div className="flex-grow-1 ms-2 ms-md-3">
                <div className="d-flex align-items-baseline">
                  <h6 className="me-2">Matthew Twomey</h6>
                  <span className="badge py-1 bg-light text-muted fw-normal">2 days ago</span>
                </div>
                <div>This is some content from a media component. You can replace this with any content and adjust it as needed.</div>
              </div>
            </div>

            <div className="bg-light px-3 py-3 rounded-bottom">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <div className="avatar avatar-sm rounded-circle">
                    <img className="avatar-img" src="https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-2 ms-md-3">
                  <div className="d-flex align-items-baseline">
                    <h6 className="me-2">Jordan Singer</h6>
                    <span className="badge py-1 bg-white text-muted fw-normal">2 days ago</span>
                  </div>
                  <div>That sounds good! When can we start?</div>
                </div>
              </div>

              <div className="my-3 bg-white" style={{ height: '1px', width: '100%' }}></div>

              <div className="d-flex">
                <div className="flex-shrink-0">
                  <div className="avatar avatar-sm rounded-circle">
                    <img className="avatar-img" src="https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200" alt="" />
                  </div>
                </div>
                <div className="flex-grow-1 ms-2 ms-md-3">
                  <div className="d-flex align-items-baseline">
                    <h6 className="me-2">Gregory Harrison</h6>
                    <span className="badge py-1 bg-white text-muted fw-normal">2 days ago</span>
                  </div>
                  <div>Yep, I agree with <span className="badge py-1 bg-dark text-white fw-normal rounded-pill">Jordan S</span>.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </>
  );
};

export default SingleProduct;