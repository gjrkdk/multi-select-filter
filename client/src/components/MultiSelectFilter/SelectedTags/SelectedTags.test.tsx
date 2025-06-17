import { render, fireEvent, screen } from "@testing-library/react";
import { SelectedTags } from "./SelectedTags";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("SelectedTags", () => {
  const mockToggle = vi.fn();

  beforeEach(() => {
    mockToggle.mockClear();
  });

  it("renders decoded tags correctly", () => {
    render(
      <SelectedTags
        selectedItems={["Boeken &amp; Media"]}
        toggle={mockToggle}
      />
    );
    expect(screen.getByText("Boeken & Media")).toBeInTheDocument();
  });

  it("calls toggle when tag is clicked", () => {
    render(<SelectedTags selectedItems={["E-books"]} toggle={mockToggle} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /Verwijder geselecteerd filter: E-books/i
      })
    );
    expect(mockToggle).toHaveBeenCalledWith("E-books");
  });

  it("applies correct accessibility attributes", () => {
    render(<SelectedTags selectedItems={["Thrillers"]} toggle={mockToggle} />);

    const container = screen.getByRole("group", {
      name: /Geselecteerde filters/i
    });
    expect(container).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: /Verwijder geselecteerd filter: Thrillers/i
    });
    expect(button).toBeInTheDocument();
  });

  it("renders multiple selected tags", () => {
    render(
      <SelectedTags
        selectedItems={["Boeken", "E-books", "Thrillers"]}
        toggle={mockToggle}
      />
    );

    expect(screen.getByText("Boeken")).toBeInTheDocument();
    expect(screen.getByText("E-books")).toBeInTheDocument();
    expect(screen.getByText("Thrillers")).toBeInTheDocument();
  });
});
