// Install axios if not already installed: npm install axios
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "../Assets/Styles/Login.css";
import { Context } from '../common/Context';

const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const { ToastContainer,toast ,Swal } = useContext(Context);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, id]);

  const handleLogin = async () => {
    try {

      if (!mobileNumber || !password) {
        // toast.error('Mobile number and password are required');
        Swal.fire({
          title: "Oops!",
          text: "Please enter a mobile number and password",
          icon: "error"
        });
        return;
      }

      const response = await axios.post('https://tekiskymart.onrender.com/user/login', {
        mobileNumber,
        password,
      });


      if(!response?.status==200) {
        // toast.error('Mobile number and password are required');
        Swal.fire({
          title: "Oops!",
          text: "Mobile number and password are required",
          icon: "error"
        });
        return;
      }

      // Check the response for successful login
      if (response?.status==200 || response?.data?.success) {
        // toast.success(response.data.message)
        Swal.fire({
          title: "Congratulation!",
          text: "Login Successful",
          icon: "success"
        });
        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('mobileNumber', response.data.user.mobileNumber);
        localStorage.setItem('token', response.data.token);

        navigate('/');
      }else{

        Swal.fire({
          title: "Oops!",
          text: "Invalid mobile number or password",
          icon: "error"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      // toast.error('Invalid mobile number or password')
      Swal.fire({
        title: "Oops!",
        text: "Invalid mobile number or password",
        icon: "error"
      });
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
