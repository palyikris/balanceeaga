export type CategoryType = 'income' | 'expense' | 'transfer';

export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: CategoryType;
  reference_count: number;
}