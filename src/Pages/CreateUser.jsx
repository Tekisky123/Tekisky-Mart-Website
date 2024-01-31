import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Assets/Styles/AddProductForm.css";

const AddUser = () => {
  const navigate = useNavigate();
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    role: "", // Assuming a default role for simplicity
    shopCategory: "", // Specific to shop users
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
      const response = await axios.post(
        "https://tekiskymart.onrender.com/user/createUser",
        formData
      );

      // Handle successful user creation
      setMessage({ type: "success", content: "User created successfully." });

      // Optionally, you can redirect the user to another page
      navigate.push("/");
    } catch (error) {
      // Handle error
      setMessage({ type: "error", content: "Error creating user." });
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div>
      <h2 className="title">Add User</h2>

      {/* {message && (
        <div style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.content}
        </div>
      )} */}

      <form onSubmit={handleSubmit} className="addProductForm">
        <div>
          <label className="formLabel">First Name:</label>
          <input
            className="formInput"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="formLabel">Last Name:</label>
          <input
            className="formInput"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="formLabel">Mobile Number:</label>
          <input
            className="formInput"
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="formLabel">Email:</label>
          <input
            className="formInput"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="formLabel">Password:</label>
          <input
            className="formInput"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="formLabel">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="formInput"
          >
            <option value="">Select Role</option>
            <option value="seller">Saller</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>

        {/* Additional fields specific to shop users */}
        <div>
          <label className="formLabel">Shop Category:</label>
          <select
            name="shopCategory"
            value={formData.shopCategory}
            onChange={handleChange}
            className="formInput"
          >
            <option value="dates">Dates</option>
            <option value="clothing">Clothing</option>
            <option value="Homemade Snacks">Homemade Snacks</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div>
          <button className="formButton" type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
