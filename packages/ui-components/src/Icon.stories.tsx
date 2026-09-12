import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Text } from "react-native";

import { Icon } from "./Icon.js";
import { lightTheme } from "./theme/tokens.js";

const meta = {
  argTypes: {
    size: { control: "select", options: ["inline", "list", "nav", "max"] },
  },
  args: {
    render: ({ color, size }) => (
      <Text style={{ color, fontSize: size }}>★</Text>
    ),
  },
  component: Icon,
  tags: ["autodocs"],
  title: "Components/Icon",
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Decorative by default: hidden from screen readers. */
export const Decorative: Story = {};

/** Passing `label` makes it a meaningful image for screen readers. */
export const Labelled: Story = { args: { label: "Favourite" } };

export const Colored: Story = { args: { color: lightTheme.colors.semantic.danger.text } };
