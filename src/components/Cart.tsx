import React, { useState } from 'react';
import { X } from 'lucide-react'; // Import your icons

const CartOverlay = ({ cartItems, total, onClose, adjustQuantity }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-white w-80 h-full p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">MY CART</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between my-2">
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">${item.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => adjustQuantity(item.id, item.quantity - 1)} 
                    disabled={item.quantity === 1}
                    className="bg-gray-200 p-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => adjustQuantity(item.id, item.quantity + 1)} 
                    className="bg-gray-200 p-1 rounded"
                  >
                    +
                  </button>
                </div>
                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between mt-4 border-t pt-4">
              <span>Subtotal:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <button className="bg-blue-600 text-white py-2 mt-4 w-full rounded hover:bg-blue-700">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EcommerceShop = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const adjustQuantity = (id, quantity) => {
    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item
      ).filter(item => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      {/* Cart Button */}
      <button 
        onClick={() => setShowCart(true)} 
        className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-4 shadow-lg"
      >
        ${total.toFixed(2)}
      </button>

      {/* Main content goes here... */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sample products */}
        <button onClick={() => addToCart({ id: 1, name: 'Navy Blue Shirt', price: 50 })}>
          Add to Cart
        </button>
        <button onClick={() => addToCart({ id: 2, name: 'Black Sunglasses', price: 30 })}>
          Add to Cart
        </button>
        {/* Add more product buttons as needed */}
      </div>

      {/* Cart Overlay */}
      {showCart && (
        <CartOverlay 
          cartItems={cart} 
          total={total} 
          onClose={() => setShowCart(false)} 
          adjustQuantity={adjustQuantity}
        />
      )}
    </div>
  );
};

export default EcommerceShop;