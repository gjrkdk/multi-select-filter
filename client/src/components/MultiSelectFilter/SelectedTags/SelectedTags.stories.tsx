import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectedTags } from "./SelectedTags";

const meta: Meta<typeof SelectedTags> = {
  title: "MultiSelectFilter/SelectedTags",
  component: SelectedTags,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    selectedItems: {
      control: "object",
      description: "The currently selected tags"
    },
    toggle: {
      action: "tag removed",
      description: "Callback triggered when a tag is removed"
    }
  }
};

export default meta;
type Story = StoryObj<typeof SelectedTags>;

export const Default: Story = {
  args: {
    selectedItems: ["Boeken", "Media", "E-books"]
  }
};

export const ManyTags: Story = {
  args: {
    selectedItems: [
      "Fotografie",
      "E-books",
      "Thrillers",
      "Kinderboeken",
      "Fantasy",
      "Boeken",
      "Media"
    ]
  }
};
