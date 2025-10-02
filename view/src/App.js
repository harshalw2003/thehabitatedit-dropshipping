import './App.css';
import '../src/assets/css/HomePage.css';
import '../src/assets/css/ProductsPage.css';
import '../src/assets/css/LoadingAnimations.css'; // Import loading animations globally
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ScrollToTop from './components/ScrollToTop';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import About from './components/About';
import YourOrders from './components/YourOrders';
import Contact from './components/Contact';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/your-orders" element={<YourOrders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
