import type { Transaction } from "@/types/transaction";
import axios from "axios";



export async function fetchAllTransactions() {
  const apiBase = import.meta.env.VITE_API_BASE;
  const res = await axios.get<Transaction[]>(`${apiBase}/transactions`);
  return res.data;
}