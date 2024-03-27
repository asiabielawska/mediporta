import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import BasicSelect from "./components/BasicSelect";

type arrayData = [
  {
    name: string;
    count: number;
  }
];

function App() {
  const [loadingStage, setLoadingStage] = useState("");
  const [dataArray, setDataArray] = useState<arrayData | undefined>();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingStage("Loading");
        const response = await fetch(
          "https://api.stackexchange.com/2.3/tags?pagesize=10&order=desc&sort=popular&site=stackoverflow"
        );
        const data = await response.json();
        setDataArray(data.items);
        setLoadingStage("Success");
      } catch (error) {
        setLoadingStage("Error");
      }
    };
    getData();
  }, []);

  return (
    <>
      <input
        type="number"
        id="page-size"
        name="page-size"
        min="1"
        max="50"
        placeholder="Page size"
        style={{ width: 150 }}
      />
      <BasicSelect
        label={"Pole"}
        arrayValues={["popular", "activity", "name"]}
      />
      <BasicSelect label={"Order"} arrayValues={["ascending", "descending"]} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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

      {loadingStage && <div>{loadingStage}</div>}
    </>
  );
}

export default App;
