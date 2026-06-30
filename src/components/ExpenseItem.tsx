import type { Expense } from '../types/expense'
type ExpenseItemProps = {
    expense: Expense;
    deleteExpense: (id: number) => void;
}

function ExpenseItem({ expense, deleteExpense }: ExpenseItemProps) {
    return (
        <div className='expense-item'>
            <li className=''>
                {expense.amount}
                <button
                    className='delete-btn'
                    onClick={() => { deleteExpense(expense.id) }}>
                    delete
                </button>
            </li>
        </div>
    )
}

export default ExpenseItem;