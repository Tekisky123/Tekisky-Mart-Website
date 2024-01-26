// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Assets/Styles/SingleProduct.css'; // Import the CSS file

// SingleProduct component
const SingleProduct = () => {
  const { id } = useParams();

  // State to store product data
  const [product, setProduct] = useState(null);
  // State to manage quantity
  const [quantity, setQuantity] = useState(1);

  // Effect to fetch product data based on the product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://tekisky-mart.onrender.com/admin/getoneproduct/${id}`);
        setProduct(response.data.getOneProduact);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Check if product data is still loading
  if (!product) {
    return <div>Loading...</div>;
  }

  // Destructure product data
  const {
    productName,
    productDetails,
    imageURL,
  } = product;

  return (
    <div className="product-container">
      <div className="image-carousel">
        {imageURL.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Product ${index + 1}`}
            className={`product-image ${index === 0 ? 'main-image' : ''}`}
          />
        ))}
      </div>

      <div className="product-details">
        <h1 className="product-name">{productName}</h1>

        <div className="product-info">
          <div className="details-section">
            <h2>Product Details</h2>
            {productDetails.map((detail) => (
             <div>

              <div key={detail._id}>
                <p>Stock Qty: {detail.availableStockQty}</p>
                <p>MRP: {detail.mrp}</p>
                <p>Offer Price: {detail.offerPrice}</p>
                <p>Packet Weight: {detail.packetweight}</p>
                
              </div>
              <div className="quantity-section">
            
            <div className="quantity-input-container">
            <label htmlFor="quantity" className="quantity-label">Quantity:</label>
            <div className='counterDiv'>
            <button className="quantity-button" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="quantity-input"
              />
              <button className="quantity-button" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
           
            </div>

            <button className="buy-now-button">
              Check out
            </button>
          </div>
             </div>

            ))}
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
