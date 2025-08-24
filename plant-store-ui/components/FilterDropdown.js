export default function FilterDropdown({ onFilterChange }) {
  const categories = ["Indoor", "Outdoor", "Succulent", "Air Purifying", "Low Maintenance", "Home Decor"];

  return (
    <div className="w-full md:w-1/3">
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}