import type { Category } from "@/types/category";
import api from "../api";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get(`/categories`);

  return response.data;
};

export const fetchCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};





