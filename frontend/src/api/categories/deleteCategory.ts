import api from "../api";

export const deleteCategoryById = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
