import type { Meta, StoryObj } from "@storybook/react";
import { BasicSelect } from "../components/BasicSelect";
import { useArgs } from "@storybook/preview-api";

const meta: Meta<typeof BasicSelect> = {
  title: "Components/BasicSelect",
  component: BasicSelect,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Species",
    arrayValues: ["Cat", "Dog", "Bird", "Cow", "Horse", "Monkey"],
  },
};

export default meta;

type Story = StoryObj<typeof BasicSelect>;

export const Primary: Story = {
  args: {
    value: "Cat",
  },
};

export const WorkingExample: Story = {
  args: {
    value: "Dog",
  },
  render: function Component(args) {
    const [_, updateArgs] = useArgs();
    return (
      <BasicSelect
        {...args}
        handleChange={(e) =>
          updateArgs({
            value: e.target.value,
          })
        }
      />
    );
  },
};
