import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { useState } from "react";
import { fn } from "storybook/test";

import { Select } from "./Select.js";

const CATEGORIES = [
  { label: "Streaming", value: "streaming" },
  { label: "Music", value: "music" },
  { label: "Software", value: "software" },
];

const meta = {
  args: { label: "Category", onChange: fn(), options: CATEGORIES },
  component: Select,
  // The field owns no state, so the story holds the selected value.
  render: function SelectStory(args) {
    const [value, setValue] = useState(args.value);

    return <Select {...args} onChange={setValue} value={value} />;
  },
  tags: ["autodocs"],
  title: "Components/Select",
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Selected: Story = { args: { value: "music" } };

export const CustomPlaceholder: Story = {
  args: { placeholder: "Pick a category" },
};
