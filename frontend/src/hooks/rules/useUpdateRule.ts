import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRule } from "@/api/rules/updateRule";
import { notify } from "@/toast";
import type { Rule } from "@/types/rule";

export function useUpdateRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Rule, "id" | "created_at" | "updated_at">> }) => updateRule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rules"] });
      notify.success("Szabály sikeresen frissítve!");
    },
    onError: (error) => {
      notify.error("Hiba a szabály frissítése során!");
      console.error("Hiba a szabály frissítése során!", error);
    },
  });
}
