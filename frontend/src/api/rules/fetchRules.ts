import type { Rule } from "@/types/rule";
import axios from "axios";
import { fetchCategoryById } from "../categories/fetchCategories";

export async function fetchRules(): Promise<Rule[]> {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get<Rule[]>(`${apiBase}/rules`);
  await Promise.all(response.data.map(async (rule) => {
    if (rule.action_set_category) {
      const category = await fetchCategoryById(rule.action_set_category);
      rule.action_set_category_name = category.name;
    }
  }));
  return response.data;
}
