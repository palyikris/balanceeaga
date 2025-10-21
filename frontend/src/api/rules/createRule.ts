import type { Rule } from "@/types/rule";
import api from "../api";

export async function createRule(
  data: Omit<Rule, "id" | "created_at" | "updated_at">
): Promise<Rule> {
  const response = await api.post(`/rules`, data);
  return response.data;
}
