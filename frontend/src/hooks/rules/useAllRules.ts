import { useQuery } from "@tanstack/react-query";
import { fetchRules } from "@/api/rules/fetchRules";

export function useAllRules() {
  return useQuery({
    queryKey: ["rules"],
    queryFn: fetchRules,
  });
}
