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
  const [date, setDate] = useState<string>(getToday());
  const [category, setCategory] = useState<string>("Other");
  const [amount, setAmount] = useState<string>("");
  const [payment, setPayment] = useState<string>("Cash");
  const [receipt, setReceipt] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  //本地存储
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses])

  //添加
  function addExpense() {
    const newExpense: Expense = {
      id: Date.now(),
      date: date,
      category: category,
      amount: Number(amount),
      payment: payment,
      receipt: receipt,
      note: note,
    };

    //添加成功
    setExpenses([...expenses, newExpense]);

    //重置输入项
    setDate(getToday());
    setCategory("Other");
    setAmount("");
    setPayment("Cash");
    setReceipt(false);
    setNote("");
  }

  function deleteExpense() {

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

          addExpense={addExpense}
        />

        <ExpenseList
          expenses={expenses}
          deleteExpense={deleteExpense}
        />

      </div>
    </>
  )
}

export default App
