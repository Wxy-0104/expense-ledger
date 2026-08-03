"use client";

import { useLedger } from "@/components/ledger/LedgerProvider";

export default function SettingsPage() {
  const { clearExpenses, copy, currency, expenses, locale, setCurrency, setLocale } = useLedger();

  const handleClear = () => {
    if (expenses.length === 0 || window.confirm(copy.settings.clearConfirm)) clearExpenses();
  };

  return (
    <main>
      <header className="page-header"><div><span className="eyebrow">{copy.settings.eyebrow}</span><h1>{copy.settings.title}</h1><p>{copy.settings.subtitle}</p></div></header>
      <section className="settings-grid">
        <article className="panel settings-card">
          <div><h2>{copy.settings.preferences}</h2><p>{copy.settings.preferencesHint}</p></div>
          <label><span>{copy.settings.language}</span><select value={locale} onChange={(event) => setLocale(event.target.value as "en" | "ja")}><option value="ja">日本語</option><option value="en">English</option></select></label>
          <label><span>{copy.settings.currency}</span><select value={currency} onChange={(event) => setCurrency(event.target.value as "JPY" | "USD" | "CNY")}><option value="JPY">JPY — ¥</option><option value="USD">USD — $</option><option value="CNY">CNY — ¥</option></select></label>
        </article>
        <article className="panel settings-card danger-zone">
          <div><h2>{copy.settings.data}</h2><p>{copy.settings.dataHint}</p></div>
          <div className="data-summary"><span>{copy.settings.localRecords}</span><strong>{expenses.length}</strong></div>
          <button className="button danger" type="button" onClick={handleClear}>{copy.settings.clear}</button>
        </article>
      </section>
    </main>
  );
}
