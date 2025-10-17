import axios from "axios";

export const recategorizeTransactions = async () => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get(`${apiBase}/transactions/reapply-rules`);
  return response.data;
}