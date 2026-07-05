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
    saveExpense: () => void;
    t: Record<string, string>;
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
    saveExpense,
    t
}: ExpenseFormProps) {

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
                        <option value="">{t.category}</option>
                        <option value="Transport">{t.transport}</option>
                        <option value="Food">{t.food}</option>
                        <option value="Office">{t.office}</option>
                        <option value="Other">{t.other}</option>
                    </select>

                    <input
                        type="string"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={t.amount} />

                    <select
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}>
                        <option value="">{t.payment}</option>
                        <option value="Cash">{t.cash}</option>
                        <option value="Card">{t.card}</option>
                        <option value="Other">{t.other}</option>
                    </select>

                    <label className="receipt-toggle">
                        <input
                            type="checkbox"
                            checked={receipt}
                            onChange={(e) => setReceipt(e.target.checked)}
                        />
                        {t.receipt}
                    </label>


                    <input
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder={t.note}
                    />
                </div>

                <button className="save-btn" onClick={saveExpense}>
                    {t.save}
                </button>
            </div>
        </>
    )
}
export default ExpenseForm;