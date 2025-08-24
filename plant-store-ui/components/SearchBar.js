export default function SearchBar({ onSearch }) {
  return (
    <div className="w-full md:w-2/3">
      <input
        type="text"
        placeholder="Search for a plant by name or category..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}