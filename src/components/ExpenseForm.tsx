type ExpenseFormProps = {
    date: string;
    setDate: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    amount: string;
    setAmount: (value: string) => void;
    payment: string;
    setPayment: (value: string) => void;
    receipt: boolean;
    setReceipt: (value: boolean) => void;
    note: string;
    setNote: (value: string) => void;
    addExpense: () => void;
}

function ExpenseForm({
    date,
    setDate,
    category,
    setCategory,
    amount,
    setAmount,
    payment,
    setPayment,
    receipt,
    setReceipt,
    note,
    setNote,
    addExpense }: ExpenseFormProps) {

    return (
        <>
            <div className="expense-form">

                <div className="input-form">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Category</option>
                        <option value="Transport">Transport</option>
                        <option value="Food">Food</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                    </select>

                    <input
                        type="string"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount" />

                    <select
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}>
                        <option value="">Payment</option>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="Other">Other</option>
                    </select>

                    <label className="receipt-toggle">
                        <input
                            type="checkbox"
                            checked={receipt}
                            onChange={(e) => setReceipt(e.target.checked)}
                        />
                        Receipt
                    </label>


                    <input
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Note"
                    />
                </div>

                <button className="add-btn" onClick={addExpense}>
                    Add
                </button>
            </div>
        </>
    )
}
export default ExpenseForm;