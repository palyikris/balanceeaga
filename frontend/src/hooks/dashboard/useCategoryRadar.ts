import { fetchCategoryRadar } from "@/api/dashboard/fetchCategoryRadar";
import { useQuery } from "@tanstack/react-query";


export const useCategoryRadar = () => {
  return useQuery({
    queryKey: ["categoryRadar"],
    queryFn: fetchCategoryRadar,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}