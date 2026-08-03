"use client";

import { FormEvent, useMemo, useState } from "react";
import { CATEGORIES, PAYMENTS, useLedger } from "@/components/ledger/LedgerProvider";
import { getLocalDateKey } from "@/lib/date";
import type { Expense, ExpenseDraft } from "@/types/expense";

const emptyDraft = (): ExpenseDraft => ({ date: "", category: "transport", amount: "", payment: "card", receipt: false, note: "" });

export default function ExpensesPage() {
  const { addExpense, copy, deleteExpense, expenses, formatAmount, hydrated, updateExpense } = useLedger();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ExpenseDraft>(emptyDraft);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");

  const visibleExpenses = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    return [...expenses]
      .filter((expense) => {
        const matchesKeyword = !normalizedKeyword || [expense.date, expense.note, copy.categories[expense.category], copy.payments[expense.payment]].join(" ").toLowerCase().includes(normalizedKeyword);
        return matchesKeyword && (!category || expense.category === category);
      })
      .sort((left, right) => right.date.localeCompare(left.date));
  }, [category, copy, expenses, keyword]);

  const visibleTotal = visibleExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const openCreate = () => {
    setEditingId(null);
    setDraft({ ...emptyDraft(), date: getLocalDateKey() });
    setError("");
    setFormOpen(true);
  };

  const openEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setDraft({ date: expense.date, category: expense.category, amount: String(expense.amount), payment: expense.payment, receipt: expense.receipt, note: expense.note });
    setError("");
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(draft.amount);
    if (!draft.date || draft.amount.trim() === "" || !Number.isFinite(amount) || amount < 0) {
      setError(copy.expenses.validationError);
      return;
    }
    if (editingId) updateExpense(editingId, draft);
    else addExpense(draft);
    closeForm();
  };

  const handleDelete = (expense: Expense) => {
    if (window.confirm(copy.expenses.deleteConfirm)) deleteExpense(expense.id);
  };

  return (
    <main>
      <header className="page-header">
        <div><span className="eyebrow">{copy.expenses.eyebrow}</span><h1>{copy.expenses.title}</h1><p>{copy.expenses.subtitle}</p></div>
        <button className="button primary" type="button" onClick={openCreate}>{copy.expenses.add}</button>
      </header>

      <section className="filter-bar" aria-label={copy.expenses.filters}>
        <label className="search-field"><span className="sr-only">{copy.expenses.search}</span><input type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder={copy.expenses.searchPlaceholder} /></label>
        <label><span className="sr-only">{copy.expenses.category}</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">{copy.expenses.allCategories}</option>{CATEGORIES.map((item) => <option value={item} key={item}>{copy.categories[item]}</option>)}</select></label>
        <div className="filter-summary"><span>{visibleExpenses.length} {copy.expenses.records}</span><strong>{formatAmount(visibleTotal)}</strong></div>
      </section>

      <section className="panel table-panel">
        {!hydrated ? <p className="empty-state">{copy.common.loading}</p> : visibleExpenses.length === 0 ? (
          <div className="empty-state"><strong>{copy.expenses.emptyTitle}</strong><span>{copy.expenses.emptyText}</span></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>{copy.expenses.date}</th><th>{copy.expenses.category}</th><th>{copy.expenses.payment}</th><th>{copy.expenses.receipt}</th><th>{copy.expenses.note}</th><th className="amount-cell">{copy.expenses.amount}</th><th><span className="sr-only">{copy.expenses.actions}</span></th></tr></thead>
              <tbody>
                {visibleExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td><td><span className={`category-pill ${expense.category}`}>{copy.categories[expense.category]}</span></td><td>{copy.payments[expense.payment]}</td><td>{expense.receipt ? copy.common.yes : copy.common.no}</td><td className="note-cell">{expense.note || "—"}</td><td className="amount-cell">{formatAmount(expense.amount)}</td>
                    <td><div className="row-actions"><button type="button" onClick={() => openEdit(expense)}>{copy.common.edit}</button><button className="delete-link" type="button" onClick={() => handleDelete(expense)}>{copy.common.delete}</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {formOpen && (
        <div className="modal-backdrop" role="presentation">
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="expense-form-title">
            <div className="modal-heading"><div><span className="eyebrow">{editingId ? copy.common.edit : copy.common.new}</span><h2 id="expense-form-title">{editingId ? copy.expenses.editTitle : copy.expenses.addTitle}</h2></div><button className="icon-button" type="button" onClick={closeForm} aria-label={copy.common.close}>×</button></div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label><span>{copy.expenses.date}</span><input required type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} /></label>
                <label><span>{copy.expenses.amount}</span><input required min="0" step="0.01" inputMode="decimal" type="number" value={draft.amount} onChange={(event) => setDraft({ ...draft, amount: event.target.value })} /></label>
                <label><span>{copy.expenses.category}</span><select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as ExpenseDraft["category"] })}>{CATEGORIES.map((item) => <option value={item} key={item}>{copy.categories[item]}</option>)}</select></label>
                <label><span>{copy.expenses.payment}</span><select value={draft.payment} onChange={(event) => setDraft({ ...draft, payment: event.target.value as ExpenseDraft["payment"] })}>{PAYMENTS.map((item) => <option value={item} key={item}>{copy.payments[item]}</option>)}</select></label>
                <label className="full-width"><span>{copy.expenses.note}</span><input maxLength={120} value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} placeholder={copy.expenses.notePlaceholder} /></label>
                <label className="checkbox-field full-width"><input type="checkbox" checked={draft.receipt} onChange={(event) => setDraft({ ...draft, receipt: event.target.checked })} /><span>{copy.expenses.hasReceipt}</span></label>
              </div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <div className="modal-actions"><button className="button secondary" type="button" onClick={closeForm}>{copy.common.cancel}</button><button className="button primary" type="submit">{copy.common.save}</button></div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
