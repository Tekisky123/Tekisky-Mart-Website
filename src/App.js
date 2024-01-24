import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      </BrowserRouter>
    </div>
  );
}

export default App;
