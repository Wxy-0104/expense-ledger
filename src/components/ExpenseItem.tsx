import type { Expense } from '../types/expense'
type ExpenseItemProps = {
    expense: Expense;
    deleteExpense: (id: number) => void;
    startEdit: (id: number) => void;
    t: Record<string, string>;
}

function ExpenseItem({ expense, deleteExpense, startEdit, t }: ExpenseItemProps) {
    return (
        <li className='expense-item'>
            <span>{expense.date}</span>
            <span>{t[expense.category.toLowerCase()]}</span>
            <span>{expense.amount}円</span>
            <span>{t[expense.payment.toLowerCase()]}</span>
            <span>{expense.receipt ? t.receipt : t.noReceipt}</span>
            <span>{expense.note}</span>

            <button
                className='edit-btn'
                onClick={() => { startEdit(expense.id) }}>
                {t.edit}
            </button>

            <button
                className='delete-btn'
                onClick={() => { deleteExpense(expense.id) }}>
                {t.delete}
            </button>
        </li>

    )
}

export default ExpenseItem;