import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PlantGrid from '../components/PlantGrid';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (category) params.append('category', category);
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plants?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch data from the server.');
        const data = await res.json();
        setPlants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
        fetchPlants();
    }, 500); // Debounce API calls by 500ms

    return () => clearTimeout(debounceTimer); // Cleanup timer on re-render
  }, [searchTerm, category]);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="text-center my-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-green-dark">Find Your Green Companion</h1>
            <p className="text-lg text-brand-green-light mt-4">Breathe life into your space with our curated collection.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-[73px] bg-brand-cream/80 backdrop-blur-sm py-4 z-10">
          <SearchBar onSearch={setSearchTerm} />
          <FilterDropdown onFilterChange={setCategory} />
        </div>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <PlantGrid plants={plants} />}
      </div>
    </Layout>
  );
}