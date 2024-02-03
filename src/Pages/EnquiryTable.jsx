import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EnquiryTable = () => {
  const [enquiryData, setEnquiryData] = useState([]);

  useEffect(() => {
    axios.get('https://tekiskymart.onrender.com/client/enquiry')
      .then(response => {
        setEnquiryData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Enquiry Information</h2>
      <table className="table table-striped table-bordered">
        <thead>
        <tr>
            
            <th>Shop Seller Name</th>
            <th>Do You Have GST</th>
            <th>GST Number</th>
            <th>Do You Have Shop</th>
            <th>Product Details</th>
            <th>Mobile Number</th>
            <th>Product You Have to Sell</th>
          </tr>
        </thead>
        <tbody>
          {enquiryData.map(enquiry => (
            <tr key={enquiry._id}>
              <td>{enquiry.shopSellerName}</td>
              <td>{enquiry.doYouHaveGST ? 'Yes' : 'No'}</td>
              <td>{enquiry.GST}</td>
              <td>{enquiry.doYouHaveShop ? 'Yes' : 'No'}</td>
              <td>{enquiry.productDetails}</td>
              <td>{enquiry.mobileNumber}</td>
              <td>{enquiry.whichProductYouHaveToSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiryTable;
