import api from "../api";

export const fetchSpendingPatterns = async (): Promise<{
  by_weekday: {
    day: string;
    amount: number;
  }[];
}> => {
  const response = await api.get(`/dashboard/spending-patterns`);
  return response.data;
};
