import { decodeHtml } from "../../utils/decodeHtml";

interface ItemRowProps {
  item: string;
  isSelected: boolean;
  toggle: (item: string) => void;
}

export const ItemRow = ({ item, isSelected, toggle }: ItemRowProps) => (
  <li className="flex items-center space-x-2">
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <input
        name={`item-checkbox-${item}`}
        type="checkbox"
        checked={isSelected}
        onChange={() => toggle(item)}
        className="accent-blue-500 w-4 h-4 border border-[#D2D1CD]"
      />
      <span
        className={`text-sm ${isSelected ? "text-[#3063CF]" : "text-gray-700"}`}
      >
        {decodeHtml(item)}
      </span>
    </label>
  </li>
);
