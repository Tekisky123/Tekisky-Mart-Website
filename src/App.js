import {  Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        
        <Route path="/" element={ <Home /> } />
        <Route path="/shopping-cart" element={<ShoppingCart/>} />
        <Route path="/single-product/:id" element={<SingleProduct/>}/>
        <Route path="/payment-step" element={<PaymentStep/>}/>
        <Route path="/sp-payment-step" element={<SpPaymentStep/>}/>
        <Route path="/add-product" element={<AddProductForm/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/category/:category" element={<CategoryPage />} />

      </Routes>

      <MyFooter />
    </div>
  );
}

export default App;
