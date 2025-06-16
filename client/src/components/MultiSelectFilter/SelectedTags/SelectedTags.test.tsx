import { render, fireEvent } from "@testing-library/react";
import { SelectedTags } from "./SelectedTags";
import { describe, it, expect, vi } from "vitest";

describe("SelectedTags", () => {
  const mockToggle = vi.fn();

  it("renders decoded tags", () => {
    const { getByText } = render(
      <SelectedTags
        selectedItems={["Boeken &amp; Media"]}
        toggle={mockToggle}
      />
    );
    expect(getByText("Boeken & Media")).toBeInTheDocument();
  });

  it("removes item when clicked", () => {
    const { getByRole } = render(
      <SelectedTags selectedItems={["E-books"]} toggle={mockToggle} />
    );
    fireEvent.click(getByRole("button", { name: /Verwijder E-books/i }));
    expect(mockToggle).toHaveBeenCalledWith("E-books");
  });
});
