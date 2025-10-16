import type { Rule } from "@/types/rule";
import axios from "axios";

export async function updateRule(id: string, data: Partial<Omit<Rule, "id" | "created_at" | "updated_at">>): Promise<Rule> {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.put(`${apiBase}/rules/${id}`, data);
  return response.data
}
