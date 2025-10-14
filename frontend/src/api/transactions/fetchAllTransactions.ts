import type { Transaction } from "@/types/transaction";
import axios from "axios";
import dayjs from "dayjs";

export async function fetchAllTransactions() {
  const apiBase = import.meta.env.VITE_API_BASE;
  const date = new Date();
  const date_from = new Date();
  date_from.setMonth(date.getMonth() - 1);
  date_from.setDate(1);
  const date_to = new Date();
  date_to.setMonth(date.getMonth() + 1);
  date_to.setDate(0);
  const res = await axios.get<Transaction[]>(
    `${apiBase}/transactions?date_from=${dayjs(date_from).format(
      "YYYY-MM-DD"
    )}&date_to=${dayjs(date_to).format("YYYY-MM-DD")}`
  );
  return res.data;
}