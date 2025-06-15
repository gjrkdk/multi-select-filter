import { MockedProvider } from "@apollo/client/testing";
import type { MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { GET_ITEMS } from "../../graphql/queries/getItems";
import { ItemList } from "./ItemList";

const mockItems = ["Kunst, Fotografie &amp; Architectuur", "Boeken", "E-books"];

const mockGetItems: MockedResponse = {
  request: {
    query: GET_ITEMS
  },
  result: {
    data: {
      items: mockItems
    }
  }
};

describe("ItemList", () => {
  it("renders decoded item text", async () => {
    render(
      <MockedProvider mocks={[mockGetItems]} addTypename={false}>
        <ItemList />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Kunst, Fotografie & Architectuur")
      ).toBeInTheDocument();
    });
  });

  it("filters correctly with decoded characters", async () => {
    render(
      <MockedProvider mocks={[mockGetItems]} addTypename={false}>
        <ItemList />
      </MockedProvider>
    );

    await screen.findByText("Kunst, Fotografie & Architectuur");

    fireEvent.change(screen.getByPlaceholderText("Zoek op ..."), {
      target: { value: "&" }
    });

    await waitFor(() => {
      expect(
        screen.getByText("Kunst, Fotografie & Architectuur")
      ).toBeInTheDocument();
    });
  });
});
