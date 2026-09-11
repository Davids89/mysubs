import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { Body, Caption, Subtitle, Title } from "./Typography.js";

const meta = {
  component: Body,
  tags: ["autodocs"],
  title: "Components/Typography",
} satisfies Meta<typeof Body>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Screen title, 22px medium. */
export const TitleText: Story = {
  render: () => <Title>Your subscriptions</Title>,
};

/** Section heading, 18px medium. */
export const SubtitleText: Story = {
  render: () => <Subtitle>Renewing this week</Subtitle>,
};

/** Default copy, 15px regular. */
export const BodyText: Story = {
  args: { children: "Netflix renews on 12 Oct for 9,99 €." },
};

/** Muted supporting copy, 11px regular. */
export const CaptionText: Story = {
  render: () => <Caption>Updated a minute ago</Caption>,
};
