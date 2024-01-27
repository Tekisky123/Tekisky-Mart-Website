import {  Route, Routes } from "react-router-dom";
import "./App.css";
import MyFooter from "./common/Footer";
import Header from "./common/Header";

import Home from "./Pages/Home";
import BestSallerSlider from "./Pages/BestSallerSlider";
import ShoppingCart from "./Pages/Cart";
import SingleProduct from "./Pages/SingleProduct";
import PaymentStep from "./Pages/PaymentSteps";
import AddProductForm from "./Pages/AddProductForm";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        
        <Route path="/" element={ <> <BestSallerSlider /> <Home /> </>} />
        <Route path="/shopping-cart" element={<ShoppingCart/>} />
        <Route path="/single-product/:id" element={<SingleProduct/>}/>
        <Route path="/payment-step" element={<PaymentStep/>}/>
        <Route path="/add-product" element={<AddProductForm/>}/>
      </Routes>

      <MyFooter />
    </div>
  );
}

export default App;
