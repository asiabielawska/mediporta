import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import BasicSelect from "./components/BasicSelect";
import { SelectChangeEvent } from "@mui/material/Select";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import { useSetNewValue } from "./hooks/useSetNewValue";

type arrayData = [
  {
    name: string;
    count: number;
  }
];

function App() {
  const [value, setNewValue] = useSetNewValue();
  const [dataArray, setDataArray] = useState<arrayData | undefined>();

  useEffect(() => {
    const getData = async () => {
      try {
        setNewValue((prev) => ({ ...prev, loadingStage: "Loading" }));
        const response = await fetch(
          `https://api.stackexchange.com/2.3/tags?page=${value.page}&pagesize=${value.inputValue}&order=${value.orderValue}&sort=${value.sortValue}&site=stackoverflow`
        );
        if (!response.ok) {
          setNewValue((prev) => ({ ...prev, loadingStage: "Error" }));
          return;
        }
        const data = await response.json();
        setDataArray(data.items);
        setNewValue((prev) => ({ ...prev, loadingStage: "Success" }));
      } catch (error) {
        setNewValue((prev) => ({ ...prev, loadingStage: "Error" }));
      }
    };
    getData();
  }, [value.sortValue, value.orderValue, value.inputValue, value.page]);

  return (
    <>
      <div>Type or pick page size form 1 to 100:</div>
      <input
        type="number"
        min="1"
        max="100"
        style={{ width: 150, marginTop: 10 }}
        value={value.inputValue}
        onChange={(event: SelectChangeEvent) => {
          setNewValue((prev) => ({ ...prev, inputValue: event.target.value }));
        }}
      />
      <BasicSelect
        label={"Sort"}
        arrayValues={["popular", "activity", "name"]}
        value={value.sortValue}
        handleChange={(event: SelectChangeEvent) => {
          setNewValue((prev) => ({
            ...prev,
            sortValue: event.target.value as string,
          }));
        }}
      />
      <BasicSelect
        label={"Order"}
        arrayValues={["asc", "desc"]}
        value={value.orderValue}
        handleChange={(event: SelectChangeEvent) => {
          setNewValue((prev) => ({
            ...prev,
            orderValue: event.target.value as string,
          }));
        }}
      />
      <TableContainer>
        <Table sx={{ width: "50%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataArray &&
              dataArray.map((element) => (
                <TableRow
                  key={element.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {element.name}
                  </TableCell>
                  <TableCell align="right">{element.count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="outlined"
        onClick={() => {
          if (value.page === 1) {
            return;
          }
          setNewValue((prev) => ({ ...prev, page: prev.page - 1 }));
        }}
        title="Previous page"
      >
        <ArrowBackIosIcon />
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          setNewValue((prev) => ({ ...prev, page: prev.page + 1 }));
        }}
        title="Next page"
      >
        <ArrowForwardIosIcon />
      </Button>

      {value.loadingStage && <div>{value.loadingStage}</div>}
    </>
  );
}

export default App;
