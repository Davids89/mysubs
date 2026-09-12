import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { fn } from "storybook/test";

import { Alert } from "./Alert.js";

const meta = {
  argTypes: {
    type: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
  args: { message: "Netflix renews in 3 days." },
  component: Alert,
  tags: ["autodocs"],
  title: "Components/Alert",
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: { message: "Subscription saved.", type: "success" },
};

export const Warning: Story = {
  args: { message: "Spotify renews tomorrow.", type: "warning" },
};

export const Error: Story = {
  args: { message: "We could not save the subscription.", type: "error" },
};

export const WithTitle: Story = {
  args: { title: "Renewal coming up" },
};

export const Dismissible: Story = {
  args: { onDismiss: fn() },
};
