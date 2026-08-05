export type Category = "transport" | "meal" | "office" | "other";
export type Payment = "cash" | "card" | "other";

export type Expense = {
  id: string,
  date: string,
  category: Category,
  amount: number,
  payment: Payment,
  receipt: boolean,
  note: string,
}
