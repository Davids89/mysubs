import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { Badge } from "./Badge.js";

const meta = {
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "success", "warning", "danger"],
    },
  },
  args: { label: "Streaming" },
  component: Badge,
  tags: ["autodocs"],
  title: "Components/Badge",
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Success: Story = { args: { label: "Active", variant: "success" } };

export const Warning: Story = {
  args: { label: "Renews soon", variant: "warning" },
};

export const Danger: Story = { args: { label: "Expired", variant: "danger" } };
