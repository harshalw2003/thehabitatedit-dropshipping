import './App.css';
import Header from './components/Header';
// import Sidebar from './Sidebar';
// import ProductGrid from './ProductGrid';
import Banner from './components/Banner';
// import BestSellers from './BestSellers';
// import MobileMenu from './MobileMenu';
import '../src/assets/css/HomePage.css';
// import SortBy from './SortBy';
// import FilterSidebar from './FilterSidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div className="App">
      <div className="homepage">
    <div className="homepage__desktop">
      <Header />
      <div className="homepage__main">
        <div className="homepage__content">
      <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
          <Banner />
        </div>
      </div>
    </div>
    {/* <div className="homepage__mobile">
      <MobileMenu />
      <BestSellers />
    </div> */}
    
  </div> 
    
    </div>
  );
}

export default App;
