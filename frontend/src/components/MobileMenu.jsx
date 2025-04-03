import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-800 hover:text-black focus:outline-none"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-16 bg-white shadow-lg py-2 px-4">
          <Link 
            to="/products?gender=M" 
            className="block py-2 text-gray-800 hover:text-black font-medium"
            onClick={() => setIsOpen(false)}
          >
            Men
          </Link>
          <Link 
            to="/products?gender=W" 
            className="block py-2 text-gray-800 hover:text-black font-medium"
            onClick={() => setIsOpen(false)}
          >
            Women
          </Link>
          <Link 
            to="/products?new=true" 
            className="block py-2 text-gray-800 hover:text-black font-medium"
            onClick={() => setIsOpen(false)}
          >
            New Releases
          </Link>
        </div>
      )}
    </div>
  );
}