import type { Meta, StoryObj } from "@storybook/react-vite";
import { ItemRow } from "./ItemRow";

const meta: Meta<typeof ItemRow> = {
  title: "MultiSelectFilter/ItemRow",
  component: ItemRow,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    toggle: { action: "toggled" },
    isSelected: {
      control: "boolean",
      description: "Indicates if the item is currently selected"
    },
    item: {
      control: "text",
      description: "Label of the item (HTML entities allowed)"
    }
  }
};

export default meta;
type Story = StoryObj<typeof ItemRow>;

export const Default: Story = {
  args: {
    item: "Kunst, Fotografie &amp; Architectuur",
    isSelected: false
  }
};

export const Selected: Story = {
  args: {
    item: "Kunst, Fotografie &amp; Architectuur",
    isSelected: true
  }
};
