import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

type Props = {
  onClick: () => void;
  type: "next" | "previous";
};

export const PaginationButton = ({ onClick, type }: Props) => {
  return (
    <Button
      color="inherit"
      onClick={onClick}
      title={type === "next" ? "Next page" : "Previous page"}
    >
      {type === "next" ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
    </Button>
  );
};
