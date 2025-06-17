import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ItemList } from "./ItemList";
import { SelectionProvider } from "../../../features/selection/SelectionProvider";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ITEMS } from "../../../graphql/queries/getItems";

const mockItems = ["Boeken", "E-books"];

const mocks = [
  {
    request: {
      query: GET_ITEMS
    },
    result: {
      data: { items: mockItems }
    }
  }
];

describe("ItemList (integration)", () => {
  it("allows selecting and deselecting items", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SelectionProvider>
          <ItemList />
        </SelectionProvider>
      </MockedProvider>
    );

    const checkbox = await screen.findByRole("checkbox", { name: /E-books/i });
    fireEvent.click(checkbox);

    const removeBtn = await screen.findByRole("button", {
      name: /Verwijder geselecteerd filter: E-books/i
    });
    expect(removeBtn).toBeInTheDocument();

    fireEvent.click(removeBtn);

    await waitFor(() =>
      expect(
        screen.queryByRole("button", {
          name: /Verwijder geselecteerd filter: E-books/i
        })
      ).not.toBeInTheDocument()
    );
  });

  it("filters visible items when user types in the search input", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SelectionProvider>
          <ItemList />
        </SelectionProvider>
      </MockedProvider>
    );

    await screen.findByText("Boeken");

    fireEvent.change(screen.getByPlaceholderText("Zoek op ..."), {
      target: { value: "E-books" }
    });

    await waitFor(() => {
      expect(screen.getByText("E-books")).toBeInTheDocument();
      expect(screen.queryByText("Boeken")).not.toBeInTheDocument();
    });
  });

  it("shows selected items at the top of the list", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SelectionProvider>
          <ItemList />
        </SelectionProvider>
      </MockedProvider>
    );

    const eBooksCheckbox = await screen.findByRole("checkbox", {
      name: /E-books/i
    });
    fireEvent.click(eBooksCheckbox);

    const allCheckboxes = screen.getAllByRole("checkbox");
    expect(allCheckboxes[0]).toHaveAttribute("name", "item-checkbox-E-books");
  });
});
