import type { Expense } from '../types/expense'
type ExpenseItemProps = {
    expense: Expense;
    deleteExpense: (id: number) => void;
    startEdit: (id: number) => void;
}

function ExpenseItem({ expense, deleteExpense, startEdit }: ExpenseItemProps) {
    return (
        <li className='expense-item'>
            <span>{expense.date}</span>
            <span>{expense.category}</span>
            <span>{expense.amount}円</span>
            <span>{expense.payment}</span>
            <span>{expense.receipt ? "Receipt" : "No Receipt"}</span>
            <span>{expense.note}</span>

            <button
                className='delete-btn'
                onClick={() => { deleteExpense(expense.id) }}>
                delete
            </button>

            <button
                className='edit-btn'
                onClick={() => { startEdit(expense.id) }}>
                edit
            </button>

        </li>
    )
}

export default ExpenseItem;