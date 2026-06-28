type ExpenseFormProps = {
    addExpense: () => void;
}

function ExpenseForm({ addExpense }: ExpenseFormProps) {

    return (
        <>
            <div className="ExpenseForm">
                <button type="button" onClick={addExpense}>
                    Add
                </button>
            </div>
        </>
    )
}
export default ExpenseForm;