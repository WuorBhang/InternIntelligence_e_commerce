import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [featuredRes, newRes] = await Promise.all([
          apiClient.get('products/?featured=true'),
          apiClient.get('products/?new=true')
        ]);
        setFeaturedProducts(featuredRes.data);
        setNewReleases(newRes.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="container mx-auto h-full flex items-center relative z-20 px-6">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold mb-4">Just Do It</h1>
            <p className="text-xl mb-6">Discover the latest collections and innovations</p>
            <Link 
              to="/products" 
              className="inline-block px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/products/${product.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="h-64 bg-gray-100 relative overflow-hidden">
                    <img 
                      src={product.main_image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    {product.original_price && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-900 font-bold">${product.price}</span>
                      {product.original_price && (
                        <span className="ml-2 text-gray-500 line-through text-sm">${product.original_price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* New Releases */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">New Releases</h2>
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {newReleases.map(product => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition">
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img 
                        src={product.main_image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-gray-900 font-bold mt-1">${product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}