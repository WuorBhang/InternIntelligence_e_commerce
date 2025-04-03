import { useCart } from '../context/CartContext';

export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    cartTotal 
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800">Your cart is empty</p>
          </div>
        ) : (
          <div className="mt-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                      <p className="text-gray-600">${item.price} x {item.quantity}</p>
                      <p className="text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Total</h2>
                <p className="text-xl font-bold">${cartTotal.toFixed(2)}</p>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}