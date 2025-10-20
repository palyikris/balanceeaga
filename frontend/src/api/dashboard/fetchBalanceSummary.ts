import axios from "axios";

export const fetchBalanceSummary = async (): Promise<{
  income: number;
  expense: number;
  net_savings: number;
  total_balance: number;
}> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get(`${apiBase}/dashboard/balance-summary`);
  return response.data;
}