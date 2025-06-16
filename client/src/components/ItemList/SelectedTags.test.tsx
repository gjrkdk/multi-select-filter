import { render, fireEvent } from "@testing-library/react";
import { SelectedTags } from "./SelectedTags";

describe("SelectedTags", () => {
  const selectedItems = ["Boeken &amp; Media"];
  const mockToggle = vi.fn();

  it("renders tag with decoded text", () => {
    const { getByText } = render(
      <SelectedTags selectedItems={selectedItems} toggle={mockToggle} />
    );

    expect(getByText("Boeken & Media")).toBeInTheDocument();
  });

  it("calls toggle when ✕ is clicked", () => {
    const { getByRole } = render(
      <SelectedTags selectedItems={selectedItems} toggle={mockToggle} />
    );

    fireEvent.click(getByRole("button", { name: /Verwijder Boeken & Media/i }));
    expect(mockToggle).toHaveBeenCalledWith("Boeken &amp; Media");
  });
});
