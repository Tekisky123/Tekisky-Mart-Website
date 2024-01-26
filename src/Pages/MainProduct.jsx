// Import necessary modules and components
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { IoRepeatOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import "../App.css";
import { Context } from "../common/Context";

// ProductMain component
const ProductMain = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { handleAddToCartHome, ToastContainer, quantity } = useContext(Context);

  const navigateToSingleProduct = (productId) => {
    navigate(`/single-product/${productId}`);
  };

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://tekiskymart.onrender.com/admin/getproduct"
        );
        setProducts(response?.data?.products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Render skeleton loading effect
  if (loading) {
    return (
      <div className="product-main">
        <ToastContainer />
        <h1 style={{ textAlign: "center" }} className="title">
          Our Products
        </h1>

        <div className="product-grid">
          {[...Array(8)].map((_, index) => (
            <div className="showcase skeleton" key={index}>
              <div className="showcase-banner">
                <div className="skeleton-img default"></div>
                <div className="skeleton-img hover"></div>
                <div className="showcase-actions">
                  <div className="skeleton-btn"></div>
                  <div className="skeleton-btn"></div>
                  <div className="skeleton-btn"></div>
                  <div className="skeleton-btn"></div>
                </div>
                
              </div>

              <div className="showcase-content">
                <div className="showcase-category skeleton"></div>
                <div className="showcase-title skeleton"></div>
                <div className="showcase-rating skeleton"></div>
                <div className="price-box">
                  <div className="price skeleton"></div>
                  <div className="skeleton"></div>
                </div>

                <div className="buttons">
                  <div className="add-cart-btn-cards skeleton"></div>
                  <div className="add-cart-btn-cards skeleton"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render actual product cards
  return (
    <div className="product-main">
      <ToastContainer />
      <h1 style={{ textAlign: "center" }} className="title">
        Our Products
      </h1>

      <div className="product-grid">
        {products.map((product, index) => (
          <div className="showcase" key={product?._id}>
            <div className="showcase-banner">
              {product?.imageURL && (
                <>
                  <img
                    src={product.imageURL[0]}
                    alt={product.productName}
                    className="product-img default"
                  />
                  <img
                    src={product.imageURL[1] || product.imageURL[0]}
                    alt={product.productName}
                    className="product-img hover"
                  />
                </>
              )}

              <div className="showcase-actions">
                <button className="btn-action">
                  <CiHeart />
                </button>
                <button
                  className="btn-action"
                  onClick={() => navigateToSingleProduct(product._id)}
                >
                  <FaRegEye />
                </button>
                <button className="btn-action">
                  <IoRepeatOutline />
                </button>
                <button
                  className="btn-action"
                  onClick={() => {
                    handleAddToCartHome(product, quantity, index);
                  }}
                >
                  <IoIosAddCircle />
                </button>
              </div>
            </div>

            <div className="showcase-content">
              <p className="showcase-category">{product?.productCategory}</p>
              <h2 className=" weight">{product?.productDetails[0]?.packetweight}</h2>
              <p>
                <Link
                  to={`/single-product/${product?._id}`}
                  className="showcase-title"
                >
                  {product?.productName}
                </Link>
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
                <p className="price">{`₹${product?.productDetails[0]?.offerPrice}`}</p>
                {product?.productDetails[0]?.mrp && (
                  <del>{`₹${product?.productDetails[0]?.mrp}`}</del>
                )}
              </div>

              <div className="buttons">
                <button
                  className="add-cart-btn-cards"
                  onClick={() => {
                    handleAddToCartHome(product, quantity, index);
                  }}
                >
                  add to cart
                </button>
                <button
                  className="add-cart-btn-cards"
                  onClick={() => navigateToSingleProduct(product._id)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductMain;
