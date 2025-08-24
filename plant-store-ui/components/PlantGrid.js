import PlantCard from './PlantCard';

export default function PlantGrid({ plants }) {
  if (plants.length === 0) {
    return <p className="text-center text-gray-500 py-10">No plants found. Try a different search!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {plants.map((plant) => (
        <PlantCard key={plant._id} plant={plant} />
      ))}
    </div>
  );
}