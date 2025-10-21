import axios from "axios";

export const fetchSpendingPatterns = async (): Promise<{
  by_weekday: {
    day: string;
    amount: number;
  }[];
}> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get(`${apiBase}/dashboard/spending-patterns`);
  return response.data;
};
