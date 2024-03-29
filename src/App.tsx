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
import { useQueryParams } from "./hooks/useQueryParam";
import { Input } from "./styled";

type TagsData = {
  name: string;
  count: number;
}[];

function App() {
  const [queryParam, setQueryParam] = useQueryParams();
  const [dataArray, setDataArray] = useState<TagsData>([]);
  const [loadingStage, setLoadingStage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingStage("Loading");
        const response = await fetch(
          `https://api.stackexchange.com/2.3/tags?page=${queryParam.page}&pagesize=${queryParam.inputValue}&order=${queryParam.orderValue}&sort=${queryParam.sortValue}&site=stackoverflow`
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
  }, [queryParam]);

  return (
    <>
      <div>Type or pick page size form 1 to 100:</div>
      <Input
        type="number"
        min="1"
        max="100"
        value={queryParam.inputValue}
        onChange={(event: SelectChangeEvent) => {
          setQueryParam((prev) => ({
            ...prev,
            inputValue: event.target.value,
          }));
        }}
      />
      <BasicSelect
        label={"Sort"}
        arrayValues={["popular", "activity", "name"]}
        value={queryParam.sortValue}
        handleChange={(event: SelectChangeEvent) => {
          setQueryParam((prev) => ({
            ...prev,
            sortValue: event.target.value,
          }));
        }}
      />
      <BasicSelect
        label={"Order"}
        arrayValues={["asc", "desc"]}
        value={queryParam.orderValue}
        handleChange={(event: SelectChangeEvent) => {
          setQueryParam((prev) => ({
            ...prev,
            orderValue: event.target.value,
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
            {dataArray.map((element) => (
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
          if (queryParam.page === 1) {
            return;
          }
          setQueryParam((prev) => ({ ...prev, page: prev.page - 1 }));
        }}
        title="Previous page"
      >
        <ArrowBackIosIcon />
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          setQueryParam((prev) => ({ ...prev, page: prev.page + 1 }));
        }}
        title="Next page"
      >
        <ArrowForwardIosIcon />
      </Button>
      {loadingStage && <div>{loadingStage}</div>}
    </>
  );
}

export default App;
