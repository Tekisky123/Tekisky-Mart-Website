import {  Route, Routes } from "react-router-dom";
import "./App.css";
import MyFooter from "./common/Footer";
import Header from "./common/Header";

import Home from "./Pages/Home";
import BestSallerSlider from "./Pages/BestSallerSlider";
import ShoppingCart from "./Pages/Cart";
import SingleProduct from "./Pages/SingleProduct";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        
        <Route path="/" element={ <> <BestSallerSlider /> <Home /> </>} />
        <Route path="/shopping-cart" element={<ShoppingCart/>} />
        <Route path="/single-product/:id" element={<SingleProduct/>}/>
      </Routes>

      <MyFooter />
    </div>
  );
}

export default App;
