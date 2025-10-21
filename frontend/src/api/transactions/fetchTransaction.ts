import type { Transaction } from '@/types/transaction';
import api from "../api";

export async function fetchTransaction(id: string): Promise<Transaction> {
  const response = await api.get<Transaction>(`/transactions/${id}`);
  return response.data;
}