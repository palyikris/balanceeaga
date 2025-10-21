import type { Category } from "@/types/category";
import api from "../api";

export const createCategory = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const response = await api.post(`/categories`, category);
  return response.data;
};