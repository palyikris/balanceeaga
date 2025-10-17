import { deleteTransaction } from "@/api/transactions/deleteTransaction"
import { notify } from "@/toast";
import { useMutation } from "@tanstack/react-query"


export const useDeleteTransaction = () => {
  return useMutation({
    mutationKey: ["delete-transaction"],
    mutationFn: (id: string) => deleteTransaction(id),
    onError: (error) => {
      console.error("Delete failed:", error);
      notify.error("Delete failed! Try again later.");
    },
  });
};