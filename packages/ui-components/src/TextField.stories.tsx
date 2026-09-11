import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { Text } from "react-native";

import { Icon } from "./Icon.js";
import { TextField } from "./TextField.js";

const meta = {
  args: { label: "Service name", placeholder: "Netflix" },
  component: TextField,
  tags: ["autodocs"],
  title: "Components/TextField",
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = { args: { value: "Netflix" } };

export const WithError: Story = {
  args: { error: "Service name is required.", value: "" },
};

export const WithIcon: Story = {
  args: {
    icon: (
      <Icon render={({ color, size }) => (
        <Text style={{ color, fontSize: size }}>🔍</Text>
      )} />
    ),
  },
};

export const Disabled: Story = {
  args: { editable: false, value: "Netflix" },
};
