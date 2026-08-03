"use client";

import { CATEGORIES, useLedger } from "@/components/ledger/LedgerProvider";

export default function AnalyticsPage() {
  const { copy, expenses, formatAmount, hydrated } = useLedger();
  const rows = CATEGORIES.map((category) => ({
    category,
    total: expenses.filter((expense) => expense.category === category).reduce((sum, expense) => sum + expense.amount, 0),
  })).sort((left, right) => right.total - left.total);
  const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);
  const average = expenses.length ? grandTotal / expenses.length : 0;

  return (
    <main>
      <header className="page-header"><div><span className="eyebrow">{copy.analytics.eyebrow}</span><h1>{copy.analytics.title}</h1><p>{copy.analytics.subtitle}</p></div></header>
      <section className="metric-grid two-columns">
        <article className="metric-card accent"><span>{copy.analytics.total}</span><strong>{hydrated ? formatAmount(grandTotal) : "—"}</strong></article>
        <article className="metric-card"><span>{copy.analytics.average}</span><strong>{hydrated ? formatAmount(average) : "—"}</strong></article>
      </section>
      <section className="panel">
        <div className="section-heading"><div><h2>{copy.analytics.byCategory}</h2><p>{copy.analytics.categoryHint}</p></div></div>
        {!hydrated ? <p className="empty-state">{copy.common.loading}</p> : grandTotal === 0 ? <p className="empty-state">{copy.analytics.empty}</p> : (
          <div className="chart-list">
            {rows.map((row) => {
              const percent = (row.total / grandTotal) * 100;
              return (
                <div className="chart-row" key={row.category}>
                  <div className="chart-label"><span>{copy.categories[row.category]}</span><strong>{formatAmount(row.total)}</strong></div>
                  <div className="bar-track" aria-label={`${copy.categories[row.category]} ${percent.toFixed(1)}%`}><span className={`bar-fill ${row.category}`} style={{ width: `${percent}%` }} /></div>
                  <small>{percent.toFixed(1)}%</small>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
