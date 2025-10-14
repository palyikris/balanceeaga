import type { Transaction } from '@/types/transaction';
import axios from 'axios';


export async function fetchTransaction(id: string): Promise<Transaction> {
  const apiBase = import.meta.env.VITE_API_BASE;
  const response = await axios.get<Transaction>(`${apiBase}/transactions/${id}`);
  return response.data;
}