import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useNavigate } from 'react-router-dom';

const AddUser = () => {
const navigate = useNavigate()
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
    role: '', // Assuming a default role for simplicity
    shopCategory: '', // Specific to shop users
  });

  // State for feedback messages
  const [message, setMessage] = useState(null);

  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('YOUR_API_ENDPOINT', formData);

      // Handle successful user creation
      setMessage({ type: 'success', content: 'User created successfully.' });

      // Optionally, you can redirect the user to another page
      navigate.push('/');
    } catch (error) {
      // Handle error
      setMessage({ type: 'error', content: 'Error creating user.' });
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <div>
      <h2>Add User</h2>

      {message && (
        <div style={{ color: message.type === 'success' ? 'green' : 'red' }}>
          {message.content}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>

        {/* Additional fields specific to shop users */}
        <div>
          <label>Shop Category:</label>
          <select
            name="shopCategory"
            value={formData.shopCategory}
            onChange={handleChange}
          >
            <option value="dates">Dates</option>
            <option value="clothing">Clothing</option>
            <option value="groceries">Groceries</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div>
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
