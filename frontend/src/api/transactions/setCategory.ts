import axios from "axios";

export const setTransactionCategory = async (
  transactionId: string,
  categoryId: string | null
) => {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.patch(`${apiBase}/transactions/${transactionId}/set-category`, {
    category_id: categoryId,
  });
  return response.data;
}
