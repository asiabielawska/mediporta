import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  label: string;
  arrayValues: string[];
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
};

export const BasicSelect = ({
  label,
  arrayValues,
  value,
  handleChange,
}: Props) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {arrayValues.map((element) => (
            <MenuItem key={element} value={element}>
              {element}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
