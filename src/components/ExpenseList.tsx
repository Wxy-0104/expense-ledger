import ExpenseItem from './ExpenseItem'
import type { Expense } from '../types/expense'
type ExpenseListProps = {
    expenses: Expense[];
    deleteExpense: (id: number) => void;
    startEdit: (id: number) => void;
    t: Record<string, string>;
}

function ExpenseList({ expenses, deleteExpense, startEdit }: ExpenseListProps) {
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
                                    deleteExpense={deleteExpense}
                                    startEdit={startEdit} />
                            ))
                        }
                    </ul>)
            }
        </div>
    )
}
export default ExpenseList;