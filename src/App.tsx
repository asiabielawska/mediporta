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

type arrayData = [
  {
    name: string;
    count: number;
  }
];

function App() {
  const [loadingStage, setLoadingStage] = useState("");

  const [dataArray, setDataArray] = useState<arrayData | undefined>();

  const [sortValue, setSortValue] = useState("popular");
  const sortHandleChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string);
  };

  const [orderValue, setOrderValue] = useState("desc");
  const orderHandleChange = (event: SelectChangeEvent) => {
    setOrderValue(event.target.value as string);
  };

  const [inputValue, setInputValue] = useState("5");
  const inputValueHandleChange = (event: SelectChangeEvent) => {
    setInputValue(event.target.value);
  };

  const [page, setPage] = useState(1);
  const pageUp = () => {
    setPage(page + 1);
  };

  const pageDown = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingStage("Loading");
        const response = await fetch(
          `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${inputValue}&order=${orderValue}&sort=${sortValue}&site=stackoverflow`
        );
        if (!response.ok) {
          setLoadingStage("Error");
          return;
        }
        const data = await response.json();
        setDataArray(data.items);
        setLoadingStage("Success");
      } catch (error) {
        setLoadingStage("Error");
      }
    };
    getData();
  }, [sortValue, orderValue, inputValue, page]);

  return (
    <>
      <div>Type or pick page size form 1 to 100:</div>
      <input
        type="number"
        min="1"
        max="100"
        style={{ width: 150, marginTop: 10 }}
        value={inputValue}
        onChange={inputValueHandleChange}
      />
      <BasicSelect
        label={"Sort"}
        arrayValues={["popular", "activity", "name"]}
        value={sortValue}
        handleChange={sortHandleChange}
      />
      <BasicSelect
        label={"Order"}
        arrayValues={["asc", "desc"]}
        value={orderValue}
        handleChange={orderHandleChange}
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
      <Button variant="outlined" onClick={pageDown} title="Previous page">
        <ArrowBackIosIcon />
      </Button>
      <Button variant="outlined" onClick={pageUp} title="Next page">
        <ArrowForwardIosIcon />
      </Button>

      {loadingStage && <div>{loadingStage}</div>}
    </>
  );
}

export default App;
