import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { Spinner } from "./Spinner.js";
import { lightTheme } from "./theme/tokens.js";

const meta = {
  argTypes: { size: { control: "select", options: ["small", "medium", "large"] } },
  component: Spinner,
  tags: ["autodocs"],
  title: "Components/Spinner",
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Medium: Story = {};

export const Small: Story = { args: { size: "small" } };

export const Colored: Story = { args: { color: lightTheme.colors.semantic.danger.text } };
