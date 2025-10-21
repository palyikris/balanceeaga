import { fetchSpendingPatterns } from "@/api/dashboard/fetchSpendingPatterns";
import { useQuery } from "@tanstack/react-query";

export const useSpendingPatterns = () => {
  return useQuery({
    queryKey: ["spending-patterns"],
    queryFn: fetchSpendingPatterns,
    retry: 1,
    retryDelay: 10000,
  });
}
