import { decodeHtml } from "../../../utils/decodeHtml";

interface SelectedTagsProps {
  selectedItems: string[];
  toggle: (item: string) => void;
}

export const SelectedTags = ({ selectedItems, toggle }: SelectedTagsProps) => (
  <div
    className="flex flex-wrap gap-2 mt-4 mb-4"
    aria-label="Geselecteerde filters"
    role="group"
  >
    {selectedItems.map((item) => {
      const decoded = decodeHtml(item);
      return (
        <button
          key={item}
          onClick={() => toggle(item)}
          className="flex items-center bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Verwijder geselecteerd filter: ${decoded}`}
        >
          <span>{decoded}</span>
          <span className="ml-2 font-bold" aria-hidden="true">
            &times;
          </span>
        </button>
      );
    })}
  </div>
);
