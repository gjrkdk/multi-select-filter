import { decodeHtml } from "../../../utils/decodeHtml";

interface ItemRowProps {
  item: string;
  isSelected: boolean;
  toggle: (item: string) => void;
}

export const ItemRow = ({ item, isSelected, toggle }: ItemRowProps) => {
  const decodedLabel = decodeHtml(item);
  const inputId = `item-${item}`;

  return (
    <li className="flex items-center space-x-2" role="none">
      <input
        id={inputId}
        name={`item-checkbox-${item}`}
        type="checkbox"
        checked={isSelected}
        onChange={() => toggle(item)}
        className="accent-blue-500 w-4 h-4 border border-[#D2D1CD]"
        aria-checked={isSelected}
        aria-label={decodedLabel}
      />
      <label
        htmlFor={inputId}
        className={`text-sm cursor-pointer select-none ${
          isSelected ? "text-[#3063CF]" : "text-gray-700"
        }`}
      >
        {decodedLabel}
      </label>
    </li>
  );
};
