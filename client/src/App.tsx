import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "./graphql/queries/getItems";

function App() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
      <h1 className="text-2xl font-bold text-blue-500">
        Bol Multi-Select Filter
      </h1>
      <ul className="mt-4 space-y-2">
        {data.items.map((item: string, index: number) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
