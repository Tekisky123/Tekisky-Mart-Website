// Install axios if not already installed: npm install axios
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Assets/Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual login API endpoint
      const response = await axios.post('https://tekiskymart.onrender.com/user/login', {
        mobileNumber,
        password,
      });

      // Check the response for successful login
      if (response.data.success) {
        // Successful login logic, e.g., redirect to a dashboard
        navigate('/');
      } 
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      {/* Your login form */}
      <div className="login-form">
        <h2>Login</h2>
        <label htmlFor="mobileNumber" className='lable'>Mobile Number:</label>
        <input
        className='input'
          type="text"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <label className='lable' htmlFor="password">Password:</label>
        <input
        className='input'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className='button'>Login</button>
      </div>

     
    </div>
  );
};

export default Login;
