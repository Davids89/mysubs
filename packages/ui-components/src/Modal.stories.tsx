import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { useState } from "react";
import { fn } from "storybook/test";

import { Button } from "./Button.js";
import { Modal } from "./Modal.js";
import { Body } from "./Typography.js";

const meta = {
  args: {
    children: <Body>This subscription will be removed for good.</Body>,
    onClose: fn(),
    title: "Delete Netflix?",
    visible: false,
  },
  component: Modal,
  // `visible` is owned by the caller, so the story drives it from a button.
  render: function ModalStory(args) {
    const [visible, setVisible] = useState(args.visible);

    return (
      <>
        <Button label="Open modal" onPress={() => setVisible(true)} />
        <Modal {...args} onClose={() => setVisible(false)} visible={visible} />
      </>
    );
  },
  tags: ["autodocs"],
  title: "Components/Modal",
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = { args: { visible: true } };

export const Closed: Story = { args: { visible: false } };

export const WithoutTitle: Story = {
  args: { title: undefined, visible: true },
};
