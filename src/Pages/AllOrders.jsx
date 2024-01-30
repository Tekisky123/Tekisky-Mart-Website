import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';
import '../Assets/Styles/AllOrders.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://tekiskymart.onrender.com/order/getAllOrders');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const openModal = (product) => {
    setModalIsOpen(true);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="first-cards-container">
      {orders.map((order) => (
        <div key={order._id} className="product">
          <div className="product-card">
            <h2 className="name">{order.customerName}</h2>
            <span className="price">₹{order.totalAmount.toFixed(2)}</span>
            <button className="popup-btn" onClick={() => openModal(order)}>
               More Details 
            </button>
            <img src={order.productsDetails[0]?.imageURL[0]} className="product-img" alt="" />
          </div>
        </div>
      ))}

<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Product Modal"
  className="popup-view"
  overlayClassName="popup-overlay"
>
  <div className="popup-card">
    <button onClick={closeModal} className="close-btn">
      <MdCancel className="cancel-btn" />
    </button>
    {selectedProduct?.productsDetails.map((product, index) => (
      <div key={index} className="product-info">
        <div className="product-img">
          <img src={product.imageURL[0]} alt={product.productName} />
        </div>
        <div className="info">
          <h2>
            {product.productName}
            <br />
            <span>Weight: {product.packetweight}</span>
          </h2>
          <p>Description: {product.description}</p>
          <div className="details">
            <span className="price">₹{product.mrp.toFixed(2)}</span>
            <p>Quantity: {product.quantity}</p>
            </div>
        </div>
        {/* <Link className="add-cart-btn">View Product</Link> */}
      </div>
    ))}
           
          
        </div>
      </Modal>
    </div>
  );
};

export default AllOrders;
