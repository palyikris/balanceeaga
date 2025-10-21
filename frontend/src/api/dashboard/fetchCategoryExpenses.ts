import api from "../api";

export const fetchCategoryExpenses = async (): Promise<
  {
    category: string;
    amount: number;
  }[]
> => {
  const response = await api.get(`/dashboard/category-expenses`);
  return response.data;
};

export type CategoryExpensesData = Awaited<
  ReturnType<typeof fetchCategoryExpenses>
>;
