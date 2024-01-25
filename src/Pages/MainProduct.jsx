import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { IoRepeatOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import "../App.css";

const ProductMain = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const navigateToSingleProduct = (productId) => {
    navigate(`/single-product/${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://tekiskymart.onrender.com/admin/getproduct');
        setProducts(response?.data?.products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="product-main">
      <h1 style={{ textAlign: "center" }} className="title">Our Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="showcase" key={product?._id}>
            <div className="showcase-banner">
              {/* Check if product?.imageURL is truthy before accessing its properties */}
              {product?.imageURL && (
                <>
                  <img src={product.imageURL[0]} alt={product.productName} className="product-img default" />
                  <img src={product.imageURL[1] || product.imageURL[0]} alt={product.productName} className="product-img hover" />
                </>
              )}

              <div className="showcase-actions">
                <button className="btn-action">
                  <CiHeart />
                </button>
                <button className="btn-action">
                  <FaRegEye />
                </button>
                <button className="btn-action">
                  <IoRepeatOutline />
                </button>
                <button className="btn-action">
                  <IoIosAddCircle />
                </button>
              </div>
            </div>

            <div className="showcase-content">
              <p className="showcase-category">{product?.productCategory}</p>
              <p>
                <Link to={`/single-product/${product?._id}`} className="showcase-title">{product?.productName}</Link>
              </p>

              <div className="showcase-rating">
                {Array.from({ length: 3 }, (_, index) => (
                  <ion-icon key={index} name="star"></ion-icon>
                ))}
                {Array.from({ length: 2 }, (_, index) => (
                  <ion-icon key={index} name="star-outline"></ion-icon>
                ))}
              </div>

              <div className="price-box">
                <p className="price">{`$${product?.productDetails[0]?.offerPrice}`}</p>
                {product?.productDetails[0]?.mrp && <del>{`$${product?.productDetails[0]?.mrp}`}</del>}
              </div>

              <div className="buttons">
                <button className="add-cart-btn-cards">add to cart</button>
                <button className="add-cart-btn-cards" onClick={() => navigateToSingleProduct(product._id)}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductMain;
