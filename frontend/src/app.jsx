import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';

function App() {
  const { cart } = useCart();
  return (
    <Router>
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex space-x-4">
          <Link 
            to="/" 
            className={({ isActive }) => 
              isActive ? 'text-blue-600 font-medium' : 'text-gray-800 hover:text-blue-600'
            }
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={({ isActive }) => 
              isActive ? 'text-blue-600 font-medium' : 'text-gray-800 hover:text-blue-600'
            }
          >
            Products
          </Link>
          <Link 
            to="/cart" 
            className={({ isActive }) => 
              isActive ? 'text-blue-600 font-medium' : 'text-gray-800 hover:text-blue-600'
            }
          >
            Cart
            {cart.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;