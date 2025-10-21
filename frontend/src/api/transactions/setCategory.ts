import api from "../api";

export const setTransactionCategory = async (
  transactionId: string,
  categoryId: string | null
) => {
  const response = await api.patch(
    `/transactions/${transactionId}/set-category`,
    {
      category_id: categoryId,
    }
  );
  return response.data;
};
