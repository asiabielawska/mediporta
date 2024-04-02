import { CircularProgress } from "@mui/material";
import { PageLoader } from "./styled";

export const Loader = () => {
  return (
    <PageLoader>
      <CircularProgress color="inherit" />
    </PageLoader>
  );
};
