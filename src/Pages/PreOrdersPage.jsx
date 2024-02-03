import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

const PreOrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data from the API using Axios
    axios.get('https://tekiskymart.onrender.com/pre/getPreOrders')
      .then(response => {
        setOrders(response.data.order);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='container'>
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
          {orders.map(order => (
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
}

export default PreOrderPage;
