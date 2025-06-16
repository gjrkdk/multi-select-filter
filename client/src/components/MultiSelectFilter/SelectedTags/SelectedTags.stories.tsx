import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectedTags } from "./SelectedTags";

const meta: Meta<typeof SelectedTags> = {
  title: "ItemList/SelectedTags",
  component: SelectedTags,
  args: {
    selectedItems: ["Boeken &amp; Media", "E-books"],
    toggle: (item: string) => alert(`Remove ${item}`)
  }
};

export default meta;
type Story = StoryObj<typeof SelectedTags>;

export const Default: Story = {};

export const ManyTags: Story = {
  args: {
    selectedItems: [
      "Fotografie",
      "E-books",
      "Thrillers",
      "Kinderboeken",
      "Fantasy",
      "Boeken &amp; Media"
    ]
  }
};
