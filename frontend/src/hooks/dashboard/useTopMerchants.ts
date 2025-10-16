import { fetchTopMerchants } from "@/api/dashboard/fetchTopMerchants";
import { useQuery } from "@tanstack/react-query";


export const useTopMerchants = () => {
  return useQuery({
    queryKey: ["topMerchants"],
    queryFn: fetchTopMerchants,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}