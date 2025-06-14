import type { GetItemsQuery } from "../generated/graphql";
import { GET_ITEMS } from "../graphql/queries/getItems";
import { useQuery } from "@apollo/client";
import { useSelection } from "../features/selection/useSelection";

export const ItemList = () => {
  const { data, loading, error } = useQuery<GetItemsQuery>(GET_ITEMS);
  const { selectedItems, toggle, isSelected } = useSelection();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const allItems = data?.items || [];

  const sortedItems = [
    ...selectedItems,
    ...allItems.filter((item) => !selectedItems.includes(item))
  ];

  return (
    <ul className="mt-4 space-y-2">
      {sortedItems.map((item: string, index: number) => (
        <li key={index} className="text-gray-700">
          <input
            type="checkbox"
            checked={isSelected(item)}
            onChange={() => toggle(item)}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};
