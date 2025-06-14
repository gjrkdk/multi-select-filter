import { MockedProvider } from "@apollo/client/testing";
import type { MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import { GET_ITEMS } from "../../graphql/queries/getItems";
import { ItemList } from "./ItemList";

const mockItems = ["Literatuur & Romans", "Thrillers", "Fantasy"];

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
  it("renders a list of items from GraphQL", async () => {
    render(
      <MockedProvider mocks={[mockGetItems]} addTypename={false}>
        <ItemList />
      </MockedProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      mockItems.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });
  });
});
