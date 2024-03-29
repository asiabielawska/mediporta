import { TableCell, TableRow } from "@mui/material";

type Props = {
  name: string;
  count: number;
};

export const TagRow = ({ name, count }: Props) => {
  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{count}</TableCell>
      </TableRow>
    </>
  );
};
