import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "../components/Loader/Loader";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Example: Story = {};
