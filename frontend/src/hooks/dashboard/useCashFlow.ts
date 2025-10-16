import { fetchCashflow } from "@/api/dashboard/fetchCashFlow";
import { useQuery } from "@tanstack/react-query";



export const useCashFlow = () => {
  return useQuery({
    queryKey: ["cashflow"],
    queryFn: fetchCashflow,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}