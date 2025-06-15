import { useState } from "react";
import type { GetItemsQuery } from "../../graphql/generated/graphql";
import { GET_ITEMS } from "../../graphql/queries/getItems";
import { useQuery } from "@apollo/client";
import { useSelection } from "../../features/selection/useSelection";

export const ItemList = () => {
  const { data, loading, error } = useQuery<GetItemsQuery>(GET_ITEMS);
  const { selectedItems, toggle, isSelected } = useSelection();
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const allItems = data?.items || [];

  const filteredItems = allItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [
    ...selectedItems,
    ...filteredItems.filter((item) => !selectedItems.includes(item))
  ];

  return (
    <div className="p-4">
      <label className="text-xl font-bold mb-4">Productgroep</label>
      <input
        type="text"
        placeholder="Zoek op ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full"
      />
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
    </div>
  );
};
