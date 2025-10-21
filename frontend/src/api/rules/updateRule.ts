import type { Rule } from "@/types/rule";
import api from "../api";

export async function updateRule(
  id: string,
  data: Partial<Omit<Rule, "id" | "created_at" | "updated_at">>
): Promise<Rule> {
  const response = await api.put(`/rules/${id}`, data);
  return response.data;
}
