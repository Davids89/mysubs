import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { Badge } from "./Badge.js";
import { Card } from "./Card.js";
import { Body, Subtitle } from "./Typography.js";

const meta = {
  argTypes: {
    variant: { control: "select", options: ["outlined", "elevated"] },
  },
  args: {
    children: (
      <>
        <Subtitle>Netflix</Subtitle>
        <Body>9,99 € · renews on 12 Oct</Body>
        <Badge label="Streaming" />
      </>
    ),
  },
  component: Card,
  tags: ["autodocs"],
  title: "Components/Card",
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {};

export const Elevated: Story = { args: { variant: "elevated" } };
