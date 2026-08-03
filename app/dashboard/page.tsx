"use client";

import Link from "next/link";
import { useLedger } from "@/components/ledger/LedgerProvider";
import { getLocalDateKey } from "@/lib/date";

export default function DashboardPage() {
  const { copy, expenses, formatAmount, hydrated } = useLedger();
  const monthKey = getLocalDateKey().slice(0, 7);
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthTotal = expenses
    .filter((expense) => expense.date.startsWith(monthKey))
    .reduce((sum, expense) => sum + expense.amount, 0);
  const recent = [...expenses]
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 5);

  return (
    <main>
      <header className="page-header">
        <div>
          <span className="eyebrow">{copy.dashboard.eyebrow}</span>
          <h1>{copy.dashboard.title}</h1>
          <p>{copy.dashboard.subtitle}</p>
        </div>
        <Link className="button primary" href="/expenses">{copy.dashboard.addExpense}</Link>
      </header>

      <section className="metric-grid" aria-label={copy.dashboard.summary}>
        <article className="metric-card accent">
          <span>{copy.dashboard.totalSpend}</span>
          <strong>{hydrated ? formatAmount(total) : "—"}</strong>
          <small>{copy.dashboard.allTime}</small>
        </article>
        <article className="metric-card">
          <span>{copy.dashboard.thisMonth}</span>
          <strong>{hydrated ? formatAmount(monthTotal) : "—"}</strong>
          <small>{monthKey}</small>
        </article>
        <article className="metric-card">
          <span>{copy.dashboard.records}</span>
          <strong>{hydrated ? expenses.length : "—"}</strong>
          <small>{copy.dashboard.savedLocally}</small>
        </article>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div><h2>{copy.dashboard.recent}</h2><p>{copy.dashboard.recentHint}</p></div>
          <Link className="text-link" href="/expenses">{copy.dashboard.viewAll}</Link>
        </div>
        {!hydrated ? (
          <p className="empty-state">{copy.common.loading}</p>
        ) : recent.length === 0 ? (
          <div className="empty-state"><strong>{copy.dashboard.emptyTitle}</strong><span>{copy.dashboard.emptyText}</span></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>{copy.expenses.date}</th><th>{copy.expenses.category}</th><th>{copy.expenses.note}</th><th className="amount-cell">{copy.expenses.amount}</th></tr></thead>
              <tbody>
                {recent.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td><span className={`category-pill ${expense.category}`}>{copy.categories[expense.category]}</span></td>
                    <td>{expense.note || "—"}</td>
                    <td className="amount-cell">{formatAmount(expense.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
