import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRule } from "@/api/rules/createRule";
import { notify } from "@/toast";

export function useCreateRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rules"] });
      notify.success("Szabály sikeresen létrehozva!");
    },
    onError: (error) => {
      console.error("Hiba a szabály létrehozása során!, ", error);
      notify.error("Hiba a szabály létrehozása során!");
    },
  });
}
