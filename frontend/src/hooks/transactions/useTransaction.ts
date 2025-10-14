import { fetchTransaction } from '@/api/transactions/fetchTransaction';
import { useQuery } from '@tanstack/react-query';



export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: () => fetchTransaction(id),
    enabled: !!id,
  });
};