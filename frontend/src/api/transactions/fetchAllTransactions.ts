import type { Transaction } from "@/types/transaction";
import api from "../api";
import dayjs from "dayjs";

export async function fetchAllTransactions() {
  const date = new Date();
  const date_from = new Date();
  date_from.setMonth(date.getMonth() - 1);
  date_from.setDate(1);
  const date_to = new Date();
  date_to.setMonth(date.getMonth() + 1);
  date_to.setDate(0);
  const res = await api.get<Transaction[]>(`/transactions`);
  return res.data;
}