import React from "react";
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
import ProductList from "./Pages/ProductList";
import PreOrder from "./Pages/PreOrder";
import SaleWithUs from "./Pages/SaleWithUs";
import Enquiry from "./Pages/Enquiry";
import PreOrdersPage from "./Pages/PreOrdersPage";
import EnquiryTable from "./Pages/EnquiryTable";
import WelcomePage from "./Pages/WelcomePage";

function App() {
  const navigate = useNavigate();
  const { singleItems } = useContext(Context);

  // Get userRole from localStorage
  const userRole = localStorage.getItem("userRole");


  // Get token from localStorage
  const token = localStorage.getItem("token");

  const location = useLocation();
  
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

  

  
  return (
    <div className="App">
      {location.pathname !== '/login' ? (<>
        <Header />
      <Routes>

     {userRole == "superadmin" &&
      <>
      <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/all-orders" element={<AllOrders />} />
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/welcome" element={ <WelcomePage /> } />

        <Route path="/add-product" element={<AddProductForm/>}/>
        <Route path="/products-list" element={<ProductList/>}/>
        <Route path="/pre-orders-page" element={<PreOrdersPage/>}/>
        <Route path="/enquiry-table" element={<EnquiryTable/>}/>
        <Route path="/shopping-cart" element={<ShoppingCart/>} />
        
      </> 
      }

     {userRole == "seller" &&
      <>
           {/* <Route path="/users" element={<Users/>}/> */}
        <Route path="/add-product" element={<AddProductForm/>}/>
        <Route path="/welcome" element={ <WelcomePage /> } />
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/seller-orders" element={<SellerAllOrders />} />
        <Route path="/single-product/:id" element={<SingleProduct />} />
        <Route path="/products-list" element={<ProductList/>}/>
        <Route path="/shopping-cart" element={<ShoppingCart/>} />

      </> 
      }
               
     {userRole !== "seller" &&
      <>
        <Route path="/" element={ <Home /> } />
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/pre-order" element={<PreOrder/>}/>
        <Route path="/shopping-cart" element={<ShoppingCart/>} />
        <Route path="/single-product/:id" element={<SingleProduct />} />
        <Route path="/payment-step" element={<PaymentStep/>}/>
        <Route path="/sp-payment-step" element={<SpPaymentStep/>}/>
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/saleWithUs" element={<SaleWithUs />} />
        <Route path="/customer-support" element={<Enquiry />} />
      </> 
      }
               
      </Routes>
      <MyFooter />
      </>) : (<>
        <Routes>
       <Route path="/login" element={<Login/>}/>
        </Routes>
      </>)}
 

         
    </div>
  );
}

export default App;
