

import React from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import MyFooter from "./common/Footer";
import Header from "./common/Header";
import Home from "./Pages/Home";
import ShoppingCart from "./Pages/Cart";
import SingleProduct from "./Pages/SingleProduct";
import PaymentStep from "./Pages/PaymentSteps";
import AddProductForm from "./Pages/AddProductForm";
import Login from "./Pages/Login";
import CreateUser from "./Pages/CreateUser";
import SpPaymentStep from "./Pages/SpPaymentStep";
import CategoryPage from "./common/CategoryPage";
import { useContext, useEffect } from "react";
import { Context } from "./common/Context";
import AllOrders from "./Pages/AllOrders";
import Users from "./Pages/User";
import SellerAllOrders from "./Pages/SallerAllOrders";
import PreOrder from './Pages/PreOrder';
import SaleWithUs from './Pages/SaleWithUs';

function App() {
  const navigate = useNavigate();
  const { singleItems } = useContext(Context);


  // Get userRole from localStorage
const userRole = localStorage.getItem('userRole');

// Get token from localStorage
const token = localStorage.getItem('token');


  const location = useLocation();
  const userType ="superadmin";
  
  useEffect(() => {
    if (
      singleItems &&
      Object.keys(singleItems).length === 0 &&
      (location.pathname.includes("/single-product/:id") ||
        location.pathname === "/sp-payment-step")
    ) {
      navigate("/");
    }
  }, [singleItems, location.pathname, navigate]);


  // useEffect(() => {
  //   if(!token){
  //     navigate("/");
  //   }

  // }, [navigate])
  
  return (
    <div className="App">
      <Header />

      <Routes>

     {userRole == "superadmin" &&
      <>
      <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/all-orders" element={<AllOrders />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-product" element={<AddProductForm/>}/>
      </> 
      }
     {userRole == "seller" &&
      <>
        <Route path="/add-product" element={<AddProductForm/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/seller-orders" element={<SellerAllOrders />} />
      </> 
      }
               
     {userRole !== "seller" &&
      <>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={<Login/>}/>
        <Route path="/pre-order" element={<PreOrder/>}/>
        <Route path="/shopping-cart" element={<ShoppingCart/>} />
        <Route path="/single-product/:id" element={<SingleProduct />} />
        <Route path="/payment-step" element={<PaymentStep/>}/>
        <Route path="/sp-payment-step" element={<SpPaymentStep/>}/>
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/saleWithUs" element={<SaleWithUs />} />
      </> 
      }
               
      </Routes>

      <MyFooter />
    </div>
  );
}

export default App;
