import axios from "axios";


export async function deleteTransaction(id: string) {
  const apiBase = import.meta.env.VITE_API_BASE;
  const res = await axios.delete(`${apiBase}/transactions/${id}`);
  return res.data;
}
