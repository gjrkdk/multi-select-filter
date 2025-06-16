import { render, fireEvent } from "@testing-library/react";
import { SearchInput } from "./SearchInput";
import { describe, it, expect, vi } from "vitest";

describe("SearchInput", () => {
  const mockSetSearchTerm = vi.fn();

  it("renders with placeholder", () => {
    const { getByPlaceholderText } = render(
      <SearchInput searchTerm="" setSearchTerm={mockSetSearchTerm} />
    );
    expect(getByPlaceholderText("Zoek op ...")).toBeInTheDocument();
  });

  it("calls setSearchTerm on change", () => {
    const { getByPlaceholderText } = render(
      <SearchInput searchTerm="" setSearchTerm={mockSetSearchTerm} />
    );

    fireEvent.change(getByPlaceholderText("Zoek op ..."), {
      target: { value: "kookboeken" }
    });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("kookboeken");
  });
});
