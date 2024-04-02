import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { BasicSelect } from "./components/BasicSelect";
import { SelectChangeEvent } from "@mui/material/Select";
import { useQueryParams } from "./hooks/useQueryParam";
import {
  Error,
  Input,
  InputContainer,
  MainContainer,
  SortingParameters,
  TableContainer,
} from "./styled";
import { TagRow } from "./components/TagRow/TagRow";
import { Loader } from "./components/Loader/Loader";
import { PaginationButton } from "./components/PaginationButton";

type TagsData = {
  name: string;
  count: number;
}[];

export const App = () => {
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
    <MainContainer>
      <SortingParameters>
        <InputContainer>
          <div>Page size:</div>
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
        </InputContainer>
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
      </SortingParameters>
      <TableContainer>
        {loadingStage === "Success" && (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataArray.map((element) => (
                <TagRow
                  key={element.name}
                  name={element.name}
                  count={element.count}
                />
              ))}
            </TableBody>
          </Table>
        )}
        {loadingStage === "Loading" && <Loader />}
        {loadingStage === "Error" && <Error>Oops..something went wrong</Error>}
      </TableContainer>
      <div>
        <PaginationButton
          onClick={() => {
            if (queryParam.page === 1) {
              return;
            }
            setQueryParam((prev) => ({ ...prev, page: prev.page - 1 }));
          }}
          type="previous"
        />
        <PaginationButton
          onClick={() => {
            setQueryParam((prev) => ({ ...prev, page: prev.page + 1 }));
          }}
          type="next"
        />
      </div>
    </MainContainer>
  );
};
