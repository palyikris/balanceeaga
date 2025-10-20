import { fetchCategoryExpenses } from "@/api/dashboard/fetchCategoryExpenses";
import { useQuery } from "@tanstack/react-query";

export const useCategoryExpenses = () => {
  return useQuery({
    queryKey: ["category-expenses"],
    queryFn: fetchCategoryExpenses,
    retry: 1,
    retryDelay: 10000,
  });
}
