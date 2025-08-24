import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function PlantCard({ plant }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(plant);
    // Optional: Add some feedback, like a toast notification
  };

  return (
    <Link href={`/plants/${plant._id}`} className="block">
      <div className="bg-white/50 rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="relative">
          <img src={plant.imageUrl} alt={plant.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
          <div className={`absolute top-3 right-3 px-3 py-1 text-sm rounded-full backdrop-blur-sm font-semibold ${plant.inStock ? 'bg-brand-green/70 text-white' : 'bg-brand-brown/70 text-white'}`}>
            {plant.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-serif font-bold text-brand-green-dark mb-2 truncate">{plant.name}</h2>
          <p className="text-2xl font-sans font-extrabold text-brand-green mb-4">₹{plant.price}</p>
          <button 
            onClick={handleAddToCart}
            className="w-full bg-brand-green/20 text-brand-green-dark font-bold py-2 px-4 rounded-lg hover:bg-brand-green hover:text-white transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}