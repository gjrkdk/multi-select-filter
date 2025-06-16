import { render, screen, fireEvent } from "@testing-library/react";
import { ItemRow } from "./ItemRow";
import { describe, it, expect, vi } from "vitest";

describe("ItemRow", () => {
  it("renders decoded text", () => {
    render(
      <ItemRow
        item="Kunst, Fotografie &amp; Architectuur"
        isSelected={false}
        toggle={() => {}}
      />
    );
    expect(
      screen.getByText("Kunst, Fotografie & Architectuur")
    ).toBeInTheDocument();
  });

  it("calls toggle on click", () => {
    const toggle = vi.fn();
    render(<ItemRow item="E-books" isSelected={false} toggle={toggle} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(toggle).toHaveBeenCalledWith("E-books");
  });
});
