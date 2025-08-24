import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import { useCart } from '../../context/CartContext';

export default function PlantDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    const fetchPlant = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plants/${id}`);
        if (!res.ok) throw new Error('Plant not found');
        const data = await res.json();
        setPlant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><ErrorMessage message={error} /></Layout>;
  if (!plant) return null;

  return (
    <Layout>
      <div className="container mx-auto p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img src={plant.imageUrl} alt={plant.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-green-dark mb-4">{plant.name}</h1>
            <p className="text-3xl font-sans font-extrabold text-brand-green mb-6">₹{plant.price}</p>
            <p className="text-lg text-brand-green-light mb-8">{plant.description}</p>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white/60 p-4 rounded-lg">
                <h3 className="font-bold font-serif text-brand-green-dark">Best Conditions</h3>
                <p className="text-brand-green-light">{plant.bestConditions}</p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg">
                <h3 className="font-bold font-serif text-brand-green-dark">Max Growth</h3>
                <p className="text-brand-green-light">{plant.maxGrowth}</p>
              </div>
            </div>

            <button 
              onClick={() => addToCart(plant)}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}