import { render, screen, fireEvent } from "@testing-library/react";
import { ItemRow } from "./ItemRow";
import { describe, it, expect, vi } from "vitest";

describe("ItemRow", () => {
  const decodedLabel = "Kunst, Fotografie & Architectuur";
  const encodedItem = "Kunst, Fotografie &amp; Architectuur";

  it("renders decoded text from encoded HTML", () => {
    render(<ItemRow item={encodedItem} isSelected={false} toggle={() => {}} />);
    expect(screen.getByText(decodedLabel)).toBeInTheDocument();
  });

  it("checkbox is checked when item is selected", () => {
    render(<ItemRow item="E-books" isSelected={true} toggle={() => {}} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("checkbox is not checked when item is not selected", () => {
    render(<ItemRow item="E-books" isSelected={false} toggle={() => {}} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("calls toggle on checkbox click", () => {
    const toggle = vi.fn();
    render(<ItemRow item="E-books" isSelected={false} toggle={toggle} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(toggle).toHaveBeenCalledWith("E-books");
  });

  it("label is associated with the correct input", () => {
    render(<ItemRow item="E-books" isSelected={false} toggle={() => {}} />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("E-books");
    expect(label).toHaveAttribute("for", checkbox.getAttribute("id"));
  });

  it("has appropriate aria attributes", () => {
    render(<ItemRow item="E-books" isSelected={true} toggle={() => {}} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toHaveAttribute("aria-label", "E-books");
  });
});
