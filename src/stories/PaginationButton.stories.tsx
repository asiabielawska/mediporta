import type { Meta, StoryObj } from "@storybook/react";
import { PaginationButton } from "../components/PaginationButton";

const meta: Meta<typeof PaginationButton> = {
  title: "Components/PaginationButton",
  component: PaginationButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PaginationButton>;

export const Next: Story = {
  args: {
    type: "next",
  },
};

export const Previous: Story = {
  args: {
    type: "previous",
  },
};
