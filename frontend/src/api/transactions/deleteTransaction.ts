import api from "../api";

export async function deleteTransaction(id: string) {
  const res = await api.delete(`/transactions/${id}`);
  return res.data;
}
