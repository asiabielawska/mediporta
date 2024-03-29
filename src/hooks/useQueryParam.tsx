import { useState } from "react";

type QueryParamsData = {
  sortValue: string;
  orderValue: string;
  inputValue: string;
  page: number;
};

export const useQueryParams = () => {
  const [value, setNewValue] = useState<QueryParamsData>({
    sortValue: "popular",
    orderValue: "desc",
    inputValue: "5",
    page: 1,
  });
  return [value, setNewValue] as const;
};
