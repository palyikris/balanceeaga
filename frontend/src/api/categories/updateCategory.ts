import type { Category } from "@/types/category";
import axios from "axios";



export const updateCategory = async (
  id: string,
  category: Omit<Category, "id">
): Promise<Category> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.put(`${apiBase}/categories/${id}`, category);
  return response.data;
};
