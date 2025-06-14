import { useQuery } from "@apollo/client";
import type { GetItemsQuery } from "./generated/graphql";
import { GET_ITEMS } from "./graphql/queries/getItems";

function App() {
  const { loading, error, data } = useQuery<GetItemsQuery>(GET_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="mt-4 space-y-2">
      {data?.items.map((item: string, index: number) => (
        <li key={index} className="text-gray-700">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default App;
