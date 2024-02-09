// OrderTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Button as BootstrapButton, Form, Dropdown } from "react-bootstrap";
import "../Assets/Styles/AllOrders.css";
import QRCode from "qrcode.react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Assets/Styles/AddProductForm.css";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci";

// Modal.setAppElement("#root");

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [qrCodeData, setQRCodeData] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [isEditOrderStatus, setIsEditOrderStatus] = useState(false);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatusClass, setOrderStatusClass] = useState("");
  const [feedback, setFeedback] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setFeedback("");
  }, [isModalOpen, selectedOrder]);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, id]);

  const handleEditOrderStatus = () => {
    if (selectedOrder && selectedOrder.orderStatus !== undefined) {
      setNewOrderStatus(selectedOrder.orderStatus);

      // Set the dynamic class based on the order status
      switch (selectedOrder.orderStatus) {
        case "order-Verified":
          setOrderStatusClass("order-verified");
          break;
        case "Dispatched":
          setOrderStatusClass("dispatched");
          break;
        case "order-cancelled":
          setOrderStatusClass("order-cancelled");
          break;
        case "Delivered":
          setOrderStatusClass("delivered");
          break;
        default:
          setOrderStatusClass("");
      }

      setIsEditOrderStatus(true);

      // If the order status is "Delivered", set the feedback state
      if (selectedOrder.orderStatus === "Delivered") {
        setFeedback(selectedOrder.feedback || "");
      }
    } else {
      console.error("Invalid selectedOrder or orderStatus");
    }
  };

  const handleUpdateOrderStatus = async () => {
    try {
      setIsLoading(true);

      const apiUrl = `https://tekiskymart.up.railway.app/order/updateOrderById/${selectedOrder._id}`;

      const updateData = { orderStatus: newOrderStatus };

      // If the order status is "Delivered", include feedback in the update data
      if (newOrderStatus) {
        updateData.feedback = feedback;
      }

      await axios.put(apiUrl, updateData);

      // Fetch the updated order details
      const updatedOrderResponse = await axios.get(
        `https://tekiskymart.up.railway.app/order/getOrderById/${selectedOrder._id}`
      );

      // Update the local state with the new order details
      const updatedOrders = orders.map((order) =>
        order._id === selectedOrder._id
          ? updatedOrderResponse.data.order
          : order
      );

      setOrders(updatedOrders);

      // Close the dropdown
      setIsEditOrderStatus(false);
      setIsLoading(false);

      Swal.fire({
        icon: "success",
        title: `Order status successfully updated to ${newOrderStatus}`,
        showConfirmButton: false,
        timer: 1500,
      });

      // Close the modal after the loading is complete
      handleCloseModal();
    } catch (error) {
      console.error("Error updating order status:", error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Failed to update order status",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://tekiskymart.up.railway.app/order/getAllOrders"
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

    // Generate QR code data
    const productDetails = order.productDetails;

    // Limiting the QR code data to the first 100 characters
    const limitedProductDetails = JSON.stringify(productDetails).slice(0, 100);

    setQRCodeData(limitedProductDetails);
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
        return orders.filter((order) =>
          order.orderStatus.toLowerCase().includes(searchInput.toLowerCase())
        );
    }
  };

  const handleFilterChange = (eventKey) => {
    setFilterType(eventKey);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredOrders = filterOrders();

  const downloadQRCode = (data, filename) => {
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}_qr_code.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
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
      <div className="custom-search-bar">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search by order status"
        />
        <div className="search-icon">
          <CiSearch />
        </div>
      </div>
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
                    <b
                      style={{
                        color:
                          order && order.orderStatus === "new order"
                            ? "#3bd30c"
                            : order && order.orderStatus === "order-Verified"
                            ? "#004AAD"
                            : order && order.orderStatus === "Dispatched"
                            ? "orange"
                            : order && order.orderStatus === "order-cancelled"
                            ? "red"
                            : order && order.orderStatus === "Delivered"
                            ? "green"
                            : "black",
                      }}
                    >
                      {order ? order.orderStatus : ""}
                    </b>
                  </td>

                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <BootstrapButton
                      className="more-info-btn"
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
            maxWidth: "800px", // Adjust the max-width as needed
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
        <div className="modal-body order-details">
          {isLoading && (
            <div className="loader-container">
              <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {selectedOrder && (
            <div>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Order ID</td>
                    <td>{selectedOrder.orderId}</td>
                  </tr>
                  <tr>
                    <td>Customer Name</td>
                    <td>{selectedOrder.customerName}</td>
                  </tr>
                  <tr>
                    <td>Mobile Number</td>
                    <td>{selectedOrder.mobileNumber}</td>
                  </tr>
                  <tr>
                    <td>Alternate Number</td>
                    <td>{selectedOrder.alternateNumber}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{selectedOrder.address}</td>
                  </tr>
                  <tr>
                    <td>Landmark</td>
                    <td>{selectedOrder.landmark}</td>
                  </tr>
                  <tr>
                    <td>Total Amount</td>
                    <td>{selectedOrder.totalAmount}</td>
                  </tr>
                  <tr>
                    <td>Order Status</td>
                    <td>
                      {selectedOrder &&
                      selectedOrder.orderStatus !== undefined ? (
                        <div className="order-status-container">
                          <b>{selectedOrder.orderStatus}</b>
                          <MdOutlineModeEditOutline
                            className="edit-icon"
                            onClick={() => handleEditOrderStatus()}
                          />
                          {isEditOrderStatus && (
                            <select
                              className="status-dropdown"
                              value={newOrderStatus}
                              onChange={(e) =>
                                setNewOrderStatus(e.target.value)
                              }
                            >
                              <option value="">Select Status</option>
                              <option value="order-Verified">
                                Order Verified
                              </option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="order-cancelled">
                                Order Cancelled
                              </option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          )}
                          {isEditOrderStatus && (
                            <button
                              className="UpdateStatusBtn"
                              onClick={() => handleUpdateOrderStatus()}
                            >
                              Update Status
                            </button>
                          )}
                        </div>
                      ) : (
                        <span>No order selected</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Feedback</td>
                    <td colSpan="2">
                      {isEditOrderStatus ? (
                        <Form.Control
                          type="text"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        />
                      ) : (
                        <span>{selectedOrder.feedback}</span>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Created At</td>
                    <td>{formatDate(selectedOrder.createdAt)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Products */}
              <h5>Products:</h5>
              <table className="table table-bordered table-responsive">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Weight / Size</th>
                    <th>Offer Price</th>
                    <th>Quantity</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.productDetails &&
                    selectedOrder.productDetails.map((product, index) => (
                      <tr key={product._id}>
                        <td>{product?.productName}</td>
                        <td>
                          <img
                            src={product.imageURL[0]}
                            alt={`Product ${index + 1}`}
                            style={{ maxWidth: "50px", maxHeight: "50px" }}
                          />
                        </td>
                        <td>
                          {product.packetweight} {product.unitOfMeasure}
                        </td>
                        <td>
                          <b>₹{product.offerPrice}</b>
                        </td>
                        <td>{product.quantity}</td>
                        <td>{product.createdBy}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* QR Code */}
              <div className="qr-code">
                <QRCode value={qrCodeData} size={128} />
              </div>

              {/* Download QR Code button */}
              <BootstrapButton
                variant="success"
                onClick={() =>
                  downloadQRCode(qrCodeData, selectedOrder.orderId)
                }
              >
                Download QR Code
              </BootstrapButton>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AllOrders;
