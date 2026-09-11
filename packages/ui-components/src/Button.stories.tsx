import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { fn } from "storybook/test";

import { Button } from "./Button.js";

const meta = {
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
    },
  },
  args: { label: "Add subscription", onPress: fn() },
  component: Button,
  tags: ["autodocs"],
  title: "Components/Button",
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };

export const Danger: Story = {
  args: { label: "Delete subscription", variant: "danger" },
};

export const Ghost: Story = { args: { label: "Cancel", variant: "ghost" } };

export const Small: Story = { args: { size: "small" } };

export const Large: Story = { args: { size: "large" } };

export const Loading: Story = { args: { loading: true } };

export const Disabled: Story = { args: { disabled: true } };
