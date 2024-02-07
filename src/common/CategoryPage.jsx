// CategoryPage.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import { useParams, Link, useLocation } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { Context } from "../common/Context";

const CategoryPage = () => {
    const location = useLocation();
    const { category } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleAddToCartHome, ToastContainer, quantity, handleBuyNow } =
      useContext(Context);

      useEffect(() => {
        window.scrollTo(0, 0);
      }, [location.pathname]);
    
  
    useEffect(() => {
      const fetchCategoryProducts = async () => {
        try {
          const response = await axios.get(
            "https://tekiskymart.up.railway.app/product/approved"
          );
          const filteredProducts = response?.data?.products.filter(
            (product) => product.productCategory === category
          );
          setCategoryProducts(filteredProducts);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching category products:", error);
          setLoading(false);
        }
      };
  
      fetchCategoryProducts();
    }, [category]);
  
    if (loading) {
        return (
          <div className="product-main">
            <ToastContainer />
        
    
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

  return (
    <div className="product-main">
      <ToastContainer />
      <h1 className="heading-of-category">
        {category}
      </h1>

      <div className="product-grid">
        {categoryProducts.map((product, index) => (
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
              
                <button
                  className="btn-action"
                  onClick={() => handleBuyNow(product)}
                >
                  <FaRegEye />
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
              <p>
                <Link
                  to={`/single-product/${product?._id}`}
                  className="showcase-title"
                >
                  {product?.productName}
                </Link>
              </p>
              <h2 className="weight">{product?.header}</h2>
              <h2 className="weight">{product?.packetweight}</h2>

              <div className="showcase-rating">
                {Array.from({ length: 3 }, (_, index) => (
                  <ion-icon key={index} name="star"></ion-icon>
                ))}
                {Array.from({ length: 2 }, (_, index) => (
                  <ion-icon key={index} name="star-outline"></ion-icon>
                ))}
              </div>

              <div className="price-box">
                <p className="price">{`₹${product?.offerPrice}`}</p>
                {product?.mrp && <del>{`₹${product?.mrp}`}</del>}
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
                  onClick={() => handleBuyNow(product)}
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

export default CategoryPage;
