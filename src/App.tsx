import { useState, useEffect } from 'react'
import type { Expense } from './types/expense'
import { getToday } from './utils/date'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'

import './App.css'

function App() {

  //数组
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) return JSON.parse(savedExpenses) as Expense[];
    return [];
  })

  //输入
  const [nextId, setNextId] = useState<number>(1);
  const [date, setDate] = useState<string>(getToday());
  const [category, setCategory] = useState<string>("Other");
  const [amount, setAmount] = useState<string>("");
  const [payment, setPayment] = useState<string>("Cash");
  const [receipt, setReceipt] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  const [editingId, setEditingId] = useState<number | null>(null);

  //本地存储
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses])

  //添加 || 编辑
  function saveExpense() {
    const newExpense: Expense = {
      id: editingId !== null ? editingId : nextId,
      date: date,
      category: category,
      amount: Number(amount),
      payment: payment,
      receipt: receipt,
      note: note,
    };

    //editing mode
    if (editingId !== null) {
      setExpenses(expenses.map(expense =>
        expense.id === editingId ?
          newExpense : expense));

      setEditingId(null);
      resetForm();
      return;
    }

    //添加成功
    setExpenses([...expenses, newExpense]);

    setNextId(nextId + 1);

    //重置输入项
    resetForm();
  }

  function resetForm() {
    setDate(getToday());
    setCategory("Other");
    setAmount("");
    setPayment("Cash");
    setReceipt(false);
    setNote("");
  }

  function startEdit(id: number) {

    const targetExpense = expenses.find(expense => expense.id === id);
    if (!targetExpense) return;


    setEditingId(id);
    // console.log("Editingid:" + editingId);

    setDate(targetExpense.date);
    setCategory(targetExpense.category);
    setAmount(targetExpense.amount.toString());
    setPayment(targetExpense.payment);
    setReceipt(targetExpense.receipt);
    setNote(targetExpense.note);
  }

  function deleteExpense(id: number) {
    setExpenses(expenses.filter(expense => expense.id !== id));
  }


  return (
    <>
      <div className='app'>

        <h1 className='app-title'>
          Expense Ledger
        </h1>

        <ExpenseForm
          date={date}
          setDate={setDate}
          category={category}
          setCategory={setCategory}
          amount={amount}
          setAmount={setAmount}
          payment={payment}
          setPayment={setPayment}
          receipt={receipt}
          setReceipt={setReceipt}
          note={note}
          setNote={setNote}
          saveExpense={saveExpense}
        />

        <ExpenseList
          expenses={expenses}
          deleteExpense={deleteExpense}
          startEdit={startEdit}
        />

      </div>
    </>
  )
}

export default App
