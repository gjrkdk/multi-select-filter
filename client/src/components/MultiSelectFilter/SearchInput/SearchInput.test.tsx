import { render, fireEvent, screen } from "@testing-library/react";
import { SearchInput } from "./SearchInput";
import { describe, it, expect, vi } from "vitest";

describe("SearchInput", () => {
  const mockSetSearchTerm = vi.fn();

  beforeEach(() => {
    mockSetSearchTerm.mockClear();
  });

  it("renders with placeholder", () => {
    render(<SearchInput searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    expect(screen.getByPlaceholderText("Zoek op ...")).toBeInTheDocument();
  });

  it("calls setSearchTerm on input change", () => {
    render(<SearchInput searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    fireEvent.change(screen.getByPlaceholderText("Zoek op ..."), {
      target: { value: "kookboeken" }
    });
    expect(mockSetSearchTerm).toHaveBeenCalledWith("kookboeken");
  });

  it("renders with the correct value", () => {
    render(
      <SearchInput searchTerm="thrillers" setSearchTerm={mockSetSearchTerm} />
    );
    const input = screen.getByPlaceholderText("Zoek op ...");
    expect(input).toHaveValue("thrillers");
  });
});
