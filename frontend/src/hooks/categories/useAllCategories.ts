import { fetchCategories } from "@/api/categories/fetchCategories"
import { useQuery } from "@tanstack/react-query"


export const useAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}