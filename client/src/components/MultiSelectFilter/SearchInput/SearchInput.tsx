import SearchIcon from "../../../assets/search.svg";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const SearchInput = ({
  searchTerm,
  setSearchTerm
}: SearchInputProps) => (
  <div className="relative">
    <label htmlFor="search-input" className="sr-only">
      Filter productgroepen
    </label>
    <input
      id="search-input"
      name="search"
      type="text"
      placeholder="Zoek op ..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-4 pr-3 py-2 border border-[#D2D1CD] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
    <img
      src={SearchIcon}
      alt=""
      aria-hidden="true"
      className="absolute right-4 top-2.5 w-5 h-5 pointer-events-none opacity-70"
    />
  </div>
);
