import { useEffect, useState } from "react";
import { GET_ITEMS } from "../../../graphql/queries/getItems";
import { useQuery } from "@apollo/client";
import { useSelection } from "../../../features/selection/useSelection";
import { decodeHtml } from "../../../utils/decodeHtml";
import fallbackData from "../../../assets/items.json";
import { SearchInput } from "../SearchInput/SearchInput";
import { SelectedTags } from "../SelectedTags/SelectedTags";
import { ItemRow } from "../ItemRow/ItemRow";
import { FixedSizeList as List } from "react-window";
import type { GetItemsQuery } from "../../../graphql/generated/graphql";

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
    <div
      className="border border-[#D2D1CD] rounded-lg p-6 w-full max-w-md shadow-sm bg-[#F8F8F8]"
      role="region"
      aria-labelledby="filter-heading"
    >
      <h2 id="filter-heading" className="text-lg font-semibold mb-4">
        Productgroep
      </h2>
      <label htmlFor="search-input" className="sr-only">
        Zoek productgroep
      </label>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {selectedItems.length > 0 && (
        <SelectedTags selectedItems={selectedItems} toggle={toggle} />
      )}
      <List
        height={384}
        itemCount={sortedItems.length}
        itemSize={35}
        width="100%"
        className="mt-4 max-h-[16rem] overflow-y-auto pr-1 space-y-3 sm:max-h-[24rem]"
        aria-label="Lijst van beschikbare productgroepen"
      >
        {({ index, style }) => {
          const item = sortedItems[index];
          return (
            <div style={style} key={item}>
              <ItemRow
                item={item}
                isSelected={isSelected(item)}
                toggle={toggle}
              />
            </div>
          );
        }}
      </List>

      <button
        type="button"
        className="mt-4 w-full bg-[#3063CF] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        aria-label="Bevestig selectie"
      >
        Toepassen
      </button>
    </div>
  );
};
