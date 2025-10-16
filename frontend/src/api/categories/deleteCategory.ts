import axios from "axios";


export const deleteCategoryById = async (id: string): Promise<void> => {
  const apiBase = import.meta.env.VITE_API_BASE;
  await axios.delete(`${apiBase}/categories/${id}`);
};
