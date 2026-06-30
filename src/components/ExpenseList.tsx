import ExpenseItem from './ExpenseItem'
import type { Expense } from '../types/expense'
type ExpenseListProps = {
    expenses: Expense[];
    deleteExpense: (id: number) => void;
}

function ExpenseList({ expenses, deleteExpense }: ExpenseListProps) {
    return (
        <div className='expense-list'>
            {
                expenses.length === 0 ?
                    (<p className='empty-text'>NO EXPENSE</p>) :
                    (<ul className='expenseList'>
                        {
                            expenses.map(expense => (
                                <ExpenseItem
                                    key={expense.id}
                                    expense={expense}
                                    deleteExpense={deleteExpense} />
                            ))
                        }
                    </ul>)
            }
        </div>
    )
}
export default ExpenseList;