import axios from "axios";

export const fetchCashflow = async (): Promise<{
  year: number;
  month: number;
  income: number;
  expense: number;
}[]> => {
  const apiBase = import.meta.env.VITE_API_BASE;

  const response = await axios.get(`${apiBase}/dashboard/cashflow`);
  return response.data;
}

export type CashflowData = Awaited<ReturnType<typeof fetchCashflow>>;