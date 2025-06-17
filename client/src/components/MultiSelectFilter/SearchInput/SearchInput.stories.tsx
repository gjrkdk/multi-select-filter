import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "MultiSelectFilter/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    searchTerm: {
      control: "text",
      description: "The current value of the search input"
    },
    setSearchTerm: {
      action: "search updated",
      description: "Callback to update the search term"
    }
  }
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Empty: Story = {
  args: {
    searchTerm: ""
  }
};

export const WithText: Story = {
  args: {
    searchTerm: "kookboeken"
  }
};
