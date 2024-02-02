// Install axios if not already installed: npm install axios
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Assets/Styles/Login.css";
import { Context } from '../common/Context';

const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const { ToastContainer,toast } = useContext(Context);

  const handleLogin = async () => {
    try {

      if (!mobileNumber || !password) {
        // toast.error('Mobile number and password are required');
        alert('Please enter a mobile number and password');
        return;
      }

      const response = await axios.post('https://tekiskymart.onrender.com/user/login', {
        mobileNumber,
        password,
      });


      if(!response?.status==200) {
        // toast.error('Mobile number and password are required');
        alert('Mobile number and password are required');
        return;
      }

      // Check the response for successful login
      if (response?.status==200 || response?.data?.success) {
        toast.success(response.data.message)
        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('token', response.data.token);

        navigate('/');
      }else{
        alert('Invalid mobile number or password');
        // toast.error('Invalid mobile number or password')
      }
    } catch (error) {
      console.error('Login error:', error);
      // toast.error('Invalid mobile number or password')
      alert('Invalid mobile number or password');
    }
  };

  return (
    <div className="login-container">
     {/* <ToastContainer/> */}
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
