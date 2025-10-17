import { setTransactionCategory } from "@/api/transactions/setCategory";
import { notify } from "@/toast";
import { useMutation } from "@tanstack/react-query";


export const useSetCategory = () => {
  return useMutation({
    mutationKey: ["set-transaction-category"],
    mutationFn: ({transactionId, categoryId}: { transactionId: string; categoryId: string | null }) =>
      setTransactionCategory(transactionId, categoryId),
    onError: (error) => {
      console.error("Error setting transaction category:", error);
      notify.error("Kategória frissítése sikertelen! Próbáld újra később.");
    },
  });
}