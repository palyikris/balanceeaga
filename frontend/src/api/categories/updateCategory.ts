import type { Category } from "@/types/category";
import api from "../api";

export const updateCategory = async (
  id: string,
  category: Omit<Category, "id" | "reference_count">
): Promise<Category> => {
  const response = await api.put(`/categories/${id}`, category);
  return response.data;
};
