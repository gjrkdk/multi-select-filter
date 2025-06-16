import type { Meta, StoryObj } from "@storybook/react-vite";
import { ItemRow } from "./ItemRow";

const meta: Meta<typeof ItemRow> = {
  title: "ItemList/ItemRow",
  component: ItemRow,
  args: {
    item: "Kunst, Fotografie &amp; Architectuur",
    isSelected: false,
    toggle: () => alert("Toggle clicked")
  }
};

export default meta;
type Story = StoryObj<typeof ItemRow>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    isSelected: true
  }
};
