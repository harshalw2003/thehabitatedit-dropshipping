import './App.css';
import '../src/assets/css/HomePage.css';
import '../src/assets/css/ProductsPage.css';
import '../src/assets/css/LoadingAnimations.css'; // Import loading animations globally
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
