// OrderTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Button as BootstrapButton, Form, Dropdown } from "react-bootstrap";
import "../Assets/Styles/AllOrders.css";

Modal.setAppElement("#root");

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://tekiskymart.onrender.com/order/getAllOrders"
        );
        setOrders(response.data.orders.reverse());
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleMoreInfo = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filterOrders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 00:00:00

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set hours to 00:00:00

    switch (filterType) {
      case "today":
        return orders.filter(
          (order) =>
            new Date(order.createdAt).getTime() >= today.getTime() &&
            new Date(order.createdAt).getTime() < tomorrow.getTime()
        );
      case "tomorrow":
        const afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(afterTomorrow.getDate() + 1);
        afterTomorrow.setHours(0, 0, 0, 0); // Set hours to 00:00:00
        return orders.filter(
          (order) =>
            new Date(order.createdAt).getTime() >= tomorrow.getTime() &&
            new Date(order.createdAt).getTime() < afterTomorrow.getTime()
        );
      case "lastWeek":
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        lastWeek.setHours(0, 0, 0, 0); // Set hours to 00:00:00
        return orders.filter(
          (order) => new Date(order.createdAt).getTime() >= lastWeek.getTime()
        );
      case "lastMonth":
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        lastMonth.setHours(0, 0, 0, 0); // Set hours to 00:00:00
        return orders.filter(
          (order) => new Date(order.createdAt).getTime() >= lastMonth.getTime()
        );
      default:
        return orders;
    }
  };

  const handleFilterChange = (eventKey) => {
    setFilterType(eventKey);
  };

  const filteredOrders = filterOrders();

  return (
    <div className="container mt-4">
      <h2>Order Details</h2>
      <Form>
        <Form.Group controlId="filterDropdown">
          <Dropdown onSelect={handleFilterChange}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter by Date
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="all">All</Dropdown.Item>
              <Dropdown.Item eventKey="today">Today</Dropdown.Item>
              <Dropdown.Item eventKey="tomorrow">Tomorrow</Dropdown.Item>
              <Dropdown.Item eventKey="lastWeek">Last Week</Dropdown.Item>
              <Dropdown.Item eventKey="lastMonth">Last Month</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Form>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderId}</td>
                  <td>{order.customerName}</td>
                  <td>{order.mobileNumber}</td>
                  <td>{order.address}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <b>{order.orderStatus}</b>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <BootstrapButton
                      variant="info"
                      onClick={() => handleMoreInfo(order)}
                    >
                      More Info
                    </BootstrapButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No orders for {filterType}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* More Info Modal */}
      {/* More Info Modal using react-modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Order Details"
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "80%", // Adjust the width as needed
            maxWidth: "600px", // Adjust the max-width as needed
            margin: "auto",
          },
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title">Order Details</h5>
          <BootstrapButton
            variant="secondary"
            onClick={handleCloseModal}
            className="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </BootstrapButton>
        </div>
        <div className="modal-body ">
          {selectedOrder && (
            <div className="order-details">
              <p>Order ID: {selectedOrder.orderId}</p>
              <p>Customer Name: {selectedOrder.customerName}</p>
              <p>Mobile Number: {selectedOrder.mobileNumber}</p>
              <p>Alternate Number: {selectedOrder.alternateNumber}</p>
              <p>Address: {selectedOrder.address}</p>
              <p>Landmark: {selectedOrder.landmark}</p>
              <p>Total Amount: {selectedOrder.totalAmount}</p>
              <p>
                Order Status: <b>{selectedOrder.orderStatus}</b>
              </p>
              <p>Created At: {formatDate(selectedOrder.createdAt)}</p>

              <h5>Products:</h5>
              <ul>
              {selectedOrder.productDetails &&
  selectedOrder.productDetails.map((product, index) => (
    <li key={product._id}>
      <p>Product {index + 1}:</p>
      <p>Product Name: {product?.productName}</p>
      <p>
        Image URL:{" "}
        <img src={product.imageURL[0]} alt={`Product ${index + 1}`} />
      </p>
      <p>
        Packet Weight: {product.packetweight} {product.unitOfMeasure}
      </p>
      <p>MRP: {product.mrp}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Created By: {product.createBy}</p>
    </li>
  ))}


              </ul>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AllOrders;
