import type { Category } from "@/types/category";
import axios from "axios";


export const fetchCategories = async (): Promise<Category[]> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get(`${apiBase}/categories`);

  return response.data;
}

export const fetchCategoryById = async (id: string): Promise<Category> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get(`${apiBase}/categories/${id}`);
  return response.data;
}





