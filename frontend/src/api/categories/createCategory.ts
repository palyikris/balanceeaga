import type { Category } from "@/types/category";
import axios from "axios";


export const createCategory = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.post(`${apiBase}/categories`, category);
  return response.data;
};