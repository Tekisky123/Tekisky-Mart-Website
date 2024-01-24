import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MyFooter from './common/Footer';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Header/>


      

      <MyFooter/>
      </BrowserRouter>


      
    </div>
  );
}

export default App;
