import type { Rule } from "@/types/rule";
import axios from "axios";

export async function createRule(data: Omit<Rule, "id" | "created_at" | "updated_at">): Promise<Rule> {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.post(`${apiBase}/rules`, data);
  return response.data;
}
