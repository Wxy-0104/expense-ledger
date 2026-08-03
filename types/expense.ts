export type Category = "transport" | "meal" | "office" | "other";
export type Payment = "cash" | "card" | "transfer";
export type Currency = "JPY" | "USD" | "CNY";
export type Locale = "en" | "ja";

export type Expense = {
  id: string;
  date: string;
  category: Category;
  amount: number;
  payment: Payment;
  receipt: boolean;
  note: string;
  createdAt: string;
};

export type ExpenseDraft = Omit<Expense, "id" | "amount" | "createdAt"> & {
  amount: string;
};
