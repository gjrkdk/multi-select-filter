import { render, fireEvent } from "@testing-library/react";
import { ItemRow } from "./ItemRow";

describe("ItemRow", () => {
  const item = "Kunst, Fotografie &amp; Architectuur";
  const mockToggle = vi.fn();

  it("renders decoded item text", () => {
    const { getByText } = render(
      <ItemRow item={item} isSelected={false} toggle={mockToggle} />
    );

    expect(getByText("Kunst, Fotografie & Architectuur")).toBeInTheDocument();
  });

  it("calls toggle when clicked", () => {
    const { getByRole } = render(
      <ItemRow item={item} isSelected={false} toggle={mockToggle} />
    );

    fireEvent.click(getByRole("checkbox"));
    expect(mockToggle).toHaveBeenCalledWith(item);
  });
});
