import axios from "axios";

export const fetchMonthlyBalance = async (): Promise<{
  month: string;
  income: number;
  expense: number;
  net: number;
}[]> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get(`${apiBase}/dashboard/monthly-balance`);
  return response.data;
}
