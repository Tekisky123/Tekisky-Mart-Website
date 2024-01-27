import React, { useContext, useState } from 'react';
import "../Assets/Styles/cart.css"
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Context } from '../common/Context';

const ShoppingCart = () => {
  const [products, setProducts] = useState([
    {
      image: "https://via.placeholder.com/200x150",
      name: "PRODUCT ITEM NUMBER 1",
      description: "Description for product item number 1",
      price: 5.99,
      quantity: 2
    },
    {
      image: "https://via.placeholder.com/200x150",
      name: "PRODUCT ITEM NUMBER 2",
      description: "Description for product item number 1",
      price: 9.99,
      quantity: 1
    }
  ]);

  const {
    cartItems,
    handleRemoveFromCart,
    cartSubTotal,
    handleCartProductQuantity,
    selectProductData,
    setOurProduct,ourProduct
  } = useContext(Context);

  const [tax] = useState(5);
  const [promotions] = useState([
    { code: "SUMMER", discount: "50%" },
    { code: "AUTUMN", discount: "40%" },
    { code: "WINTER", discount: "30%" }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const itemCount = products.reduce((count, product) => count + parseInt(product.quantity) || 0, 0);

  const subTotal = products.reduce((total, product) => total + (product.quantity * product.price), 0);

  const savedAmount = products.reduce((total, product) => total + (product.quantity * product.price), 0);

  const discountPrice = subTotal * (discount / 100);

  const totalPrice = subTotal - discountPrice + tax;

  const currencyFormatted = (value) => {
    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "INR"
    });
  };

  const updateQuantity = (index, event) => {
    const updatedProducts = [...products];
    const product = updatedProducts[index];
    const value = event.target.value;
    const valueInt = parseInt(value);

    if (value === "") {
      product.quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      product.quantity = valueInt;
    }

    updatedProducts[index] = product;
    setProducts(updatedProducts);
  };

  const checkQuantity = (index, event) => {
    if (event.target.value === "") {
      const updatedProducts = [...products];
      const product = updatedProducts[index];
      product.quantity = 1;
      updatedProducts[index] = product;
      setProducts(updatedProducts);
    }
  };

  const removeItem = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const checkPromoCode = () => {
    for (let i = 0; i < promotions.length; i++) {
      if (promoCode === promotions[i].code) {
        setDiscount(parseFloat(promotions[i].discount.replace("%", "")));
        return;
      }
    }
    alert("Sorry, the Promotional code you entered is not valid!");
  };

  return (
    <div id="app">
      {/* Header */}
      <header className="header">
        <h1>Shopping Cart</h1>
        <ul className="breadcrumb">
          <li>Home</li>
          <li>Shopping Cart</li>
        </ul>
        {/* <span className="count">{itemCount} items in the bag</span> */}
      </header>
      {/* End Header */}

      {/* Product List */}
      <section className="ourcontainer">
        {products.length > 0 ? (
          <ul className="products">
          {cartItems.map((item,index) => (
              <li className="row" key={index}>
                <div className="col left">
                  <div className="thumbnail">
                    <a href="#">
                      <img src={item.imageURL[0]} alt={item.imageURL[0]} />
                    </a>
                  </div>
                  <div className="detail">
                    <div className="name" style={{color:"#0cc1e06"}}>{item.productName}</div>
                    {/* <div className="description">{product.description}</div> */}
                    <div className="price">{currencyFormatted(item?.selectedSize?.offerPrice||item?.offerPrice )}</div>
                  </div>
                </div>

                <div className="col right">
                  <div className="quantity">
                    {/* <input
                      type="number"
                      className="quantity"
                      step="1"
                      value={product.quantity}
                      onChange={(event) => updateQuantity(index, event)}
                      onBlur={(event) => checkQuantity(index, event)}
                    /> */}
                    <div className="p-counter">
                  <span
                    className="minus"
                    onClick={() => handleCartProductQuantity("dec", item)}
                  >
                    <FaMinus  style={{color:"#0cc1e06"}}/>
                  </span>
                  <span style={{width:"70px"}} className="qty">
                  
                  {item?.selectedSize?.quantity || item?.quantity}
                  </span>
                  <span
                    className="plus"
                    onClick={() => handleCartProductQuantity("inc", item)}
                  >
                    <FaPlus  style={{color:"#0cc1e06"}}/>
                  </span>
                </div>
                  </div>

                  <div className="remove">
                    <svg onClick={() => handleRemoveFromCart(item,index)} version="1.1" className="close" xmlns="//www.w3.org/2000/svg" xmlnsXlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" enableBackground="new 0 0 60 60" xmlSpace="preserve">
                      <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"></polygon>
                    </svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-product">
            <h3>There are no products in your cart.</h3>
            <button className='cartButton'>Shopping now</button>
          </div>
        )}
      </section>
      {/* End Product List */}

      {/* Summary */}
      <section className="ourcontainer">
        {products.length > 0 && (
          <div className="promotion">
            {/* <label htmlFor="promo-code">Have A Promo Code?</label>
            <input
              type="text"
              id="promo-code"
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
            />
            <button className='cartButton' type="button" onClick={checkPromoCode}></button> */}
          </div>
        )}

        <div className="summary">
          <ul>
            <li>Subtotal <span>{currencyFormatted(cartSubTotal)}</span></li>
            {discount > 0 && <li>Discount <span>{currencyFormatted(discountPrice)}</span></li>}
            <li>Tax <span>
            {/* {currencyFormatted(tax)} */}0
            </span></li>
            <li className="total">Total <span>{currencyFormatted(cartSubTotal)}</span></li>
          </ul>
        </div>

        <div className="checkout">
          <button  disabled={cartSubTotal === 0 || isNaN(cartSubTotal) || cartItems.length <= 0} className='cartButton' type="button">Check Out</button>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;