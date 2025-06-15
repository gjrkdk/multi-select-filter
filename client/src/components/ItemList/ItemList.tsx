import { useEffect, useState } from "react";
import type { GetItemsQuery } from "../../graphql/generated/graphql";
import { GET_ITEMS } from "../../graphql/queries/getItems";
import { useQuery } from "@apollo/client";
import { useSelection } from "../../features/selection/useSelection";
import SearchIcon from "../../assets/search.svg";

export const ItemList = () => {
  const { data, loading, error } = useQuery<GetItemsQuery>(GET_ITEMS);
  const { selectedItems, toggle, isSelected } = useSelection();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");

  const allItems = data?.items || [];

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedTerm(searchTerm), 200);
    return () => clearTimeout(timeout);
  }, [searchTerm, setDebouncedTerm]);

  const filteredItems = allItems.filter((item) =>
    item.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  const sortedItems = [
    ...selectedItems,
    ...filteredItems.filter((item) => !selectedItems.includes(item))
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="border border-[#D2D1CD] rounded-lg p-6 w-full max-w-md shadow-sm bg-[#F8F8F8]">
      <label htmlFor="search-input" className="block text-base mb-2">
        Productgroep
      </label>
      <div className="relative">
        <input
          id="search-input"
          type="text"
          placeholder="Zoek op ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-3 py-2 border border-[#D2D1CD] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <img
          src={SearchIcon}
          alt="Search"
          className="absolute right-4 top-2.5 w-5 h-5 pointer-events-none opacity-70"
        />
      </div>
      <ul className="mt-4 max-h-[16rem] overflow-y-auto pr-1 space-y-3 sm:max-h-[24rem]">
        {sortedItems.map((item: string, index: number) => (
          <li key={index} className="flex items-center space-x-2">
            <label
              htmlFor={`item-${index}`}
              className="flex items-center space-x-2 cursor-pointer select-none"
            >
              <input
                id={`item-${index}`}
                type="checkbox"
                checked={isSelected(item)}
                onChange={() => toggle(item)}
                className="accent-blue-500 w-4 h-4 border border-[#D2D1CD]"
              />
              <span
                className={`text-sm ${
                  isSelected(item) ? "text-[#3063CF]" : "text-gray-700"
                }`}
              >
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-4 w-full bg-[#3063CF] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Toepassen
      </button>
    </div>
  );
};
