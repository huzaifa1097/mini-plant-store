export default function ErrorMessage({ message }) {
  return (
    <div className="text-center p-10 bg-red-100 text-red-700 rounded-lg">
      <p className="font-bold">Oops! Something went wrong.</p>
      <p>{message}</p>
    </div>
  );
}