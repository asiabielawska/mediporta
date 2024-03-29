import { styled } from "@mui/material";

export const MainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const Input = styled("input")({
  width: 150,
  marginTop: 10,
  marginRight: 15,
});

export const Loader = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  margin: 15,
});

export const SortingParameters = styled("div")({
  display: "flex",
});

export const InputContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const Error = styled("div")({
  color: "red",
  fontSize: 30,
  margin: 15,
});
