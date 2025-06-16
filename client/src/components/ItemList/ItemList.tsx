import { useEffect, useState } from "react";
import { GET_ITEMS } from "../../graphql/queries/getItems";
import { useQuery } from "@apollo/client";
import { useSelection } from "../../features/selection/useSelection";
import SearchIcon from "../../assets/search.svg";
import { decodeHtml } from "../../utils/decodeHtml";
import fallbackData from "../../assets/items.json"; // Adjust the path as necessary
import type { GetItemsQuery } from "../../graphql/generated/graphql";

export const ItemList = () => {
  const { data, loading, error } = useQuery<GetItemsQuery>(GET_ITEMS);
  const { selectedItems, toggle, isSelected } = useSelection();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");

  const allItems =
    data?.items && data.items.length > 0 ? data.items : fallbackData.data || [];

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedTerm(searchTerm), 200);
    return () => clearTimeout(timeout);
  }, [searchTerm, setDebouncedTerm]);

  const filteredItems = allItems.filter((item) =>
    decodeHtml(item).toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  const sortedItems = [
    ...selectedItems,
    ...filteredItems.filter((item) => !selectedItems.includes(item))
  ];

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.warn("GraphQL fetch failed — falling back to local JSON data");
  }

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
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {selectedItems.map((item) => (
            <span
              key={item}
              className="flex items-center bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              {decodeHtml(item)}
              <button
                onClick={() => toggle(item)}
                className="ml-2 text-blue-500 hover:text-blue-700 font-bold focus:outline-none"
                aria-label={`Verwijder ${decodeHtml(item)}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
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
                {decodeHtml(item)}
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
