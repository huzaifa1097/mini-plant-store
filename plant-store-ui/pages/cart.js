import Link from 'next/link';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <Layout>
      <div className="container mx-auto p-6 min-h-[60vh]">
        <h1 className="text-4xl font-serif font-bold text-brand-green-dark text-center my-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-brand-green-light mb-6">Your cart is currently empty.</p>
            <Link href="/" className="bg-brand-green text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-green-dark transition-colors">
              Explore Our Plants
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="flex items-center bg-white/60 p-4 rounded-lg shadow-sm gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h2 className="font-serif font-bold text-lg text-brand-green-dark">{item.name}</h2>
                    <p className="text-brand-green font-semibold">₹{item.price}</p>
                    <button onClick={() => removeFromCart(item._id)} className="text-sm text-red-500 hover:text-red-700 mt-1">
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-1 bg-gray-200 rounded-md font-bold">-</button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-1 bg-gray-200 rounded-md font-bold">+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white/80 p-6 rounded-lg shadow-lg h-fit sticky top-24">
              <h2 className="text-2xl font-serif font-bold border-b border-brand-green/20 pb-4 mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-brand-green-light">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-brand-green-light">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t border-brand-green/20 pt-4 text-brand-green-dark">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full mt-6 bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-brand-green-dark transition-colors duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}