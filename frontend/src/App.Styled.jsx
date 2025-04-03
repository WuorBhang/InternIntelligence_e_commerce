import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import MobileMenu from './components/MobileMenu';
import SearchBar from './components/SearchBar';

function App() {
  const { cart } = useCart();
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex space-x-8">
                <Link to="/" className="text-2xl font-bold text-black">
                  NIKE
                </Link>
                <div className="flex items-center">
                  <div className="hidden md:flex items-center space-x-6">
                    <Link to="/products?gender=M" className="text-gray-800 hover:text-black font-medium">
                      Men
                    </Link>
                    <Link to="/products?gender=W" className="text-gray-800 hover:text-black font-medium">
                      Women
                    </Link>
                    <Link to="/products?new=true" className="text-gray-800 hover:text-black font-medium">
                      New Releases
                    </Link>
                  </div>
                  <MobileMenu />
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <SearchBar />
                <Link to="/cart" className="text-gray-800 hover:text-black relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">NIKE</h3>
                <p className="text-gray-400">Just Do It</p>
              </div>
              <div className="flex space-x-6">
                <Link to="/about" className="hover:text-primary transition">About</Link>
                <Link to="/contact" className="hover:text-primary transition">Contact</Link>
                <Link to="/privacy" className="hover:text-primary transition">Privacy</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;