export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

type CategoryTypes = "income" | "expense" | "transfer";

interface Category {
  id: string;
  name: string;
  type: CategoryTypes;
}

export interface Transaction {
  id: string;
  user_id: string;
  import_file: string; 
  booking_date?: string | null; // ISO date string
  value_date?: string | null; // ISO date string
  amount: string; 
  currency: string;
  description_raw: string;
  description_norm: string;
  counterparty: string;
  reference?: string | null;
  category?: Category | null;
  is_transfer: boolean;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}