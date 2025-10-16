import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRule } from "@/api/rules/deleteRule";
import { notify } from "@/toast";

export function useDeleteRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rules"] });
      notify.success("Szabály sikeresen törölve!");
    },
    onError: (error) => {
      notify.error("Hiba a szabály törlése során!");
      console.error("Hiba a szabály törlése során!", error);
    },
  });
}
