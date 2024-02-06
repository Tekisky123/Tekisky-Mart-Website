import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

const PreOrderPage = () => {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, id]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://tekiskymart.up.railway.app/pre/getPreOrders")
      .then((response) => {
        setOrders(response.data.order);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container table-responsive">
      <h2>Orders Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.costumerName}</td>
              <td>{order.wichPoductWantToPurchase}</td>
              <td>{order.quantity}</td>
              <td>{order.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PreOrderPage;
