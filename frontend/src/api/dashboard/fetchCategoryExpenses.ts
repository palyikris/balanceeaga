import axios from "axios";

export const fetchCategoryExpenses = async (): Promise<{
  category: string;
  amount: number;
}[]> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get(`${apiBase}/dashboard/category-expenses`);
  return response.data;
}

export type CategoryExpensesData = Awaited<ReturnType<typeof fetchCategoryExpenses>>;
