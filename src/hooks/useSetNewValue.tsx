import { useState } from "react";

type Data = {
  loadingStage: string;
  sortValue: string;
  orderValue: string;
  inputValue: string;
  page: number;
};

export const useSetNewValue = () => {
  const [value, setNewValue] = useState<Data>({
    loadingStage: "",
    sortValue: "popular",
    orderValue: "desc",
    inputValue: "5",
    page: 1,
  });
  return [value, setNewValue] as const;
};
