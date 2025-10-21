import type { Rule } from "@/types/rule";
import api from "../api";
import { fetchCategoryById } from "../categories/fetchCategories";

export async function fetchRules(): Promise<Rule[]> {
  const response = await api.get<Rule[]>(`/rules`);
  await Promise.all(
    response.data.map(async (rule) => {
      if (rule.action_set_category) {
        const category = await fetchCategoryById(rule.action_set_category);
        rule.action_set_category_name = category.name;
      }
    })
  );
  return response.data;
}
