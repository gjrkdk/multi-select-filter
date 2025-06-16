import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "ItemList/SearchInput",
  component: SearchInput,
  args: {
    searchTerm: "",
    setSearchTerm: (val: string) => alert(`Searching: ${val}`)
  }
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Empty: Story = {};
export const WithText: Story = {
  args: {
    searchTerm: "kookboeken"
  }
};
