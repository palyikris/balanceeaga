import api from "../api";

export const fetchBalanceSummary = async (): Promise<{
  income: number;
  expense: number;
  net_savings: number;
  total_balance: number;
}> => {
  const response = await api.get(`/dashboard/balance-summary`);
  return response.data;
};
