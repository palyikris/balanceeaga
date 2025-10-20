import { fetchMonthlyBalance } from "@/api/dashboard/fetchMonthlyBalance";
import { useQuery } from "@tanstack/react-query";

export const useMonthlyBalance = () => {
  return useQuery({
    queryKey: ["monthly-balance"],
    queryFn: fetchMonthlyBalance,
    retry: 1,
    retryDelay: 10000,
  });
}
