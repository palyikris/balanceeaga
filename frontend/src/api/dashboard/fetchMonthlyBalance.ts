import api from "../api";

export const fetchMonthlyBalance = async (): Promise<
  {
    month: string;
    income: number;
    expense: number;
    net: number;
  }[]
> => {
  const response = await api.get(`/dashboard/monthly-balance`);
  return response.data;
};
