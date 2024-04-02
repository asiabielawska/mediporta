import type { Meta, StoryObj } from "@storybook/react";
import { TagRow } from "../components/TagRow/TagRow";
import { Table, TableBody } from "@mui/material";

const meta: Meta<typeof TagRow> = {
  title: "Components/TagRow",
  component: TagRow,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TagRow>;

export const Example: Story = {
  args: {
    name: "javascript",
    count: 1256,
  },
  render: function Tag(args) {
    return (
      <Table>
        <TableBody>
          <TagRow {...args} />
        </TableBody>
      </Table>
    );
  },
};
