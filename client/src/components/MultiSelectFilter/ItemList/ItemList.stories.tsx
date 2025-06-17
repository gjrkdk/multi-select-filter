import type { Meta, StoryObj } from "@storybook/react-vite";
import { ItemList } from "./ItemList";
import { SelectionProvider } from "../../../features/selection/SelectionProvider";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ITEMS } from "../../../graphql/queries/getItems";

const mockItems = ["Boeken", "E-books", "Kunst, Fotografie &amp; Architectuur"];

const mocks = [
  {
    request: {
      query: GET_ITEMS
    },
    result: {
      data: {
        items: mockItems
      }
    }
  }
];

const meta: Meta<typeof ItemList> = {
  title: "MultiSelectFilter/ItemList",
  component: ItemList,
  decorators: [
    (Story) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <SelectionProvider>
          <Story />
        </SelectionProvider>
      </MockedProvider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof ItemList>;

export const Default: Story = {};
