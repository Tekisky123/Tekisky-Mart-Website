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

function App() {
  const navigate = useNavigate();
  const { singleItems } = useContext(Context);

  const location = useLocation();
  const userType ="superadmin";
  
  useEffect(() => {
    // Check if singleItems is empty and the current pathname is either "singleProduct" or "paymentStep"
    if (
      singleItems &&
      Object.keys(singleItems).length === 0 &&
      (location.pathname.includes("/single-product") ||
        location.pathname === "/sp-payment-step")
    ) {
      navigate("/");
    }
  }, [singleItems, location.pathname, navigate]);
  return (
    <div className="App">
      <Header />

      <Routes>

     {userType == "superadmin" &&
      <>
      <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/all-orders" element={<AllOrders />} />
      </> }
               
               
        <Route path="/add-product" element={<AddProductForm/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/seller-orders" element={<SellerAllOrders />} />


        <Route path="/" element={ <Home /> } />
        <Route path="/shopping-cart" element={<ShoppingCart/>} />
        <Route path="/single-product/:id" element={<SingleProduct />} />
        <Route path="/payment-step" element={<PaymentStep/>}/>
        <Route path="/sp-payment-step" element={<SpPaymentStep/>}/>
        <Route path="/category/:category" element={<CategoryPage />} />



 
      </Routes>

      <MyFooter />
    </div>
  );
}

export default App;
