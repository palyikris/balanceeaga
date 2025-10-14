import { fetchAllTransactions } from "@/api/transactions/fetchAllTransactions";
import type { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";


export function useAllTransactions() {
  return useQuery<Transaction[], Error>({
    queryKey: ["all-transactions"],
    queryFn: fetchAllTransactions,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 10000,
  });
}