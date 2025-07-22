import './App.css';
import '../src/assets/css/HomePage.css';
import '../src/assets/css/LoadingAnimations.css'; // Import loading animations globally
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
        
  );
}

export default App;
