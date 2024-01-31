import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
// import { Link } from 'react-router-dom';
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
            <h2 className="name">Name : {order.customerName}</h2>
            <h4 className="">Order Status :-{order.orderStatus}</h4>
            <span className="price">Total Amount :₹{order.totalAmount.toFixed(2)}</span>
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

    {/* Display Customer Information */}
    <div className="customer-info">
      
      <h5>Customer Name : {selectedProduct?.customerName}</h5>
      <h5>Mobile Number: {selectedProduct?.mobileNumber}</h5>
      {selectedProduct?.alternateNumber && (
        <h5>Alternate Mobile: {selectedProduct?.alternateNumber}</h5>
      )}
      <h5>Address: {selectedProduct?.address}</h5>
      <h5>Landmark: {selectedProduct?.landmark}</h5>
    </div>

    {/* Display Product Details */}
    {selectedProduct?.productsDetails.map((product, index) => (
      
      <div key={index} className="product-info-order">
        <div className="model-product-img">
          <img src={product.imageURL[0]} alt={product.productName} />
        </div>
        <div className="info">
          <h4>
            Product Name :{product.productName}
            <br />
            <span>Weight: {product.packetweight}</span>
          </h4>
          <h4>Product Description :{product.description}</h4>
          <div className="details">
            <h5 className="price">Product Price: ₹{product.mrp.toFixed(2)}</h5>
            <h5>Quantity: {product.quantity}</h5>
          </div>
        </div>
        {/* Add any additional information you want to display for each product */}
      </div>
    ))}
  </div>
</Modal>

    </div>
  );
};

export default AllOrders;
