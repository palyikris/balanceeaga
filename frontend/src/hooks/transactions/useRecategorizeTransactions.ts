import { recategorizeTransactions } from "@/api/transactions/recategorize";
import { notify } from "@/toast";
import { useMutation } from "@tanstack/react-query";


export const useRecategorizeTransactions = () => {
  return useMutation({
    mutationKey: ["recategorize-transactions"],
    mutationFn: () => recategorizeTransactions(),
    onError: (error) => {
      console.error("Error recategorizing transactions:", error);
      notify.error("Tranzakciók újrakategorizálása sikertelen! Próbáld újra később.");
    }
  });
}