import { fetchBalanceSummary } from "@/api/dashboard/fetchBalanceSummary";
import { useQuery } from "@tanstack/react-query";

export const useBalanceSummary = () => {
  return useQuery({
    queryKey: ["balance-summary"],
    queryFn: fetchBalanceSummary,
    retry: 1,
    retryDelay: 10000,
  });
}