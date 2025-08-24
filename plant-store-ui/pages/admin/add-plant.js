import { useState } from 'react';
import Layout from '../../components/Layout';

export default function AddPlantPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: '',
    inStock: true,
    imageUrl: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    // Client-side validation
    if (!formData.name || !formData.price || !formData.categories || !formData.imageUrl) {
        setMessage('All fields are required.');
        setIsError(true);
        return;
    }

    const plantData = {
        ...formData,
        price: parseFloat(formData.price),
        categories: formData.categories.split(',').map(cat => cat.trim()), // Convert comma-separated string to array
    };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY,
            },
            body: JSON.stringify(plantData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        setMessage('Plant added successfully!');
        setIsError(false);
        setFormData({ name: '', price: '', categories: '', inStock: true, imageUrl: '' }); // Reset form
    } catch (err) {
        setMessage(err.message);
        setIsError(true);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add a New Plant</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-lg rounded-lg">
          {message && (
            <p className={`p-3 rounded-md text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </p>
          )}
          <div>
            <label htmlFor="name" className="block font-medium">Plant Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="price" className="block font-medium">Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="categories" className="block font-medium">Categories (comma-separated)</label>
            <input type="text" name="categories" value={formData.categories} onChange={handleChange} placeholder="e.g., Indoor, Air Purifying" className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block font-medium">Image URL</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="h-4 w-4" />
            <label htmlFor="inStock" className="ml-2">In Stock</label>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
            Add Plant
          </button>
        </form>
      </div>
    </Layout>
  );
}