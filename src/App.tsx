import { useState, useEffect } from 'react'
import type { Expense } from './types/expense'
import { getToday } from './utils/date'
import ExpenseForm from './components/ExpenseForm'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseList from './components/ExpenseList'
import LanguageSwitcher from './components/LanguageSwitcher'
import type { Language } from './types/language'
import { texts } from './i18n/texts'


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
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [receipt, setReceipt] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");


  //filterState
  const [searchText, setSearchText] = useState<string>("");
  // const [filterDate, setFilterDate] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  //过滤数组,传给list
  const filteredExpenses = expenses.filter(expense =>
    expense.note.toLowerCase().includes(searchText.toLowerCase()) &&
    (filterCategory === "All" || expense.category === filterCategory)
  );


  //编辑状态
  const [editingId, setEditingId] = useState<number | null>(null);

  //多语言
  const [language, setLanguage] = useState<Language>("ja");

  const t = texts[language];

  //本地存储
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses])

  //添加 || 编辑
  function saveExpense() {

    if (!validateForm()) return;

    const newExpense: Expense = {
      id: editingId !== null ? editingId : nextId,
      date: date,
      category: category || "Other",
      amount: Number(amount),
      payment: payment || "Cash",
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
    setCategory(t.category);
    setAmount("");
    setPayment(t.payment);
    setReceipt(false);
    setNote("");
  }

  //校验函数
  function validateForm(): boolean {
    const amountNumber = Number(amount);

    if (amount.trim() === "" || Number.isNaN(amountNumber) || amountNumber < 0) {
      alert(t.alert);
      return false;
    }
    return true;
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

        <header className='app-header'>

          <div className='title-group'>

            <h1 className='app-title'>
              {t.title}
            </h1>

            <p className='app-subtitle'>
              {t.subtitle}
            </p>

          </div>


          <LanguageSwitcher
            language={language}
            setLanguage={setLanguage}
          />
        </header>

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
          t={t}
        />

        <ExpenseFilter
          searchText={searchText}
          setSearchText={setSearchText}
          // filterDate={filterDate}
          // setFilterDate={setFilterDate}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          t={t}
        />

        <ExpenseList
          expenses={filteredExpenses}
          deleteExpense={deleteExpense}
          startEdit={startEdit}
          t={t}
        />

      </div>
    </>
  )
}

export default App
