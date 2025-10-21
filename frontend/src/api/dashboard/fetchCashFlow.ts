import api from "../api";

export const fetchCashflow = async (): Promise<
  {
    year: number;
    month: number;
    income: number;
    expense: number;
  }[]
> => {
  const response = await api.get(`/dashboard/cashflow`);
  return response.data;
};

export type CashflowData = Awaited<ReturnType<typeof fetchCashflow>>;
