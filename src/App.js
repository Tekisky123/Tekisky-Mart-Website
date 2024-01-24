import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MyFooter from './common/Footer';
import Header from './common/Header';
import ProductShowcase from './common/ProductShowCase';
import ProductMain from './Pages/MainProduct';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Header/>


        <ProductMain/>

        <MyFooter/>
        </BrowserRouter>


        
      </div>
  );
}

export default App;
