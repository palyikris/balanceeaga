import api from "../api";

export const recategorizeTransactions = async () => {
  const response = await api.get(`/transactions/reapply-rules`);
  return response.data;
};
