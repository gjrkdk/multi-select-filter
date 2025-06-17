import { decodeHtml } from "../../../utils/decodeHtml";

interface ItemRowProps {
  item: string;
  isSelected: boolean;
  toggle: (item: string) => void;
}

export const ItemRow = ({ item, isSelected, toggle }: ItemRowProps) => (
  <li className="flex items-center space-x-2" role="none">
    <input
      id={`item-${item}`}
      name={`item-checkbox-${item}`}
      type="checkbox"
      checked={isSelected}
      onChange={() => toggle(item)}
      className="accent-blue-500 w-4 h-4 border border-[#D2D1CD]"
    />
    <label
      htmlFor={`item-${item}`}
      className={`text-sm cursor-pointer select-none ${
        isSelected ? "text-[#3063CF]" : "text-gray-700"
      }`}
    >
      {decodeHtml(item)}
    </label>
  </li>
);
