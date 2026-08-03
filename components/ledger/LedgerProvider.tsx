"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MESSAGES } from "@/lib/messages";
import type {
  Category,
  Currency,
  Expense,
  ExpenseDraft,
  Locale,
  Payment,
} from "@/types/expense";

const EXPENSES_KEY = "expense-ledger:v2";
const LEGACY_EXPENSES_KEY = "expense-ledger:v1";
const SETTINGS_KEY = "expense-ledger:settings:v1";

export const CATEGORIES: Category[] = ["transport", "meal", "office", "other"];
export const PAYMENTS: Payment[] = ["cash", "card", "transfer"];

type LedgerContextValue = {
  expenses: Expense[];
  hydrated: boolean;
  locale: Locale;
  currency: Currency;
  copy: (typeof MESSAGES)[Locale];
  addExpense: (draft: ExpenseDraft) => void;
  updateExpense: (id: string, draft: ExpenseDraft) => void;
  deleteExpense: (id: string) => void;
  clearExpenses: () => void;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: Currency) => void;
  formatAmount: (amount: number) => string;
};

const LedgerContext = createContext<LedgerContextValue | null>(null);

const isCategory = (value: unknown): value is Category =>
  typeof value === "string" && CATEGORIES.includes(value as Category);

const isPayment = (value: unknown): value is Payment =>
  typeof value === "string" && PAYMENTS.includes(value as Payment);

const normalizeExpense = (value: unknown, index: number): Expense | null => {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const amount = Number(item.amount);
  if (!item.date || typeof item.date !== "string" || !Number.isFinite(amount) || amount < 0) return null;

  return {
    id: String(item.id ?? `legacy-${index}`),
    date: item.date,
    category: isCategory(item.category) ? item.category : "other",
    amount,
    payment: isPayment(item.payment) ? item.payment : "cash",
    receipt: Boolean(item.receipt),
    note: typeof item.note === "string" ? item.note.slice(0, 120) : "",
    createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
  };
};

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function LedgerProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [locale, setLocale] = useState<Locale>("ja");
  const [currency, setCurrency] = useState<Currency>("JPY");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let initialExpenses: Expense[] = [];
    let initialLocale: Locale = "ja";
    let initialCurrency: Currency = "JPY";

    try {
      const rawExpenses = localStorage.getItem(EXPENSES_KEY) ?? localStorage.getItem(LEGACY_EXPENSES_KEY);
      if (rawExpenses) {
        const parsed: unknown = JSON.parse(rawExpenses);
        if (Array.isArray(parsed)) {
          initialExpenses = parsed.map(normalizeExpense).filter((item): item is Expense => item !== null);
        }
      }

      const rawSettings = localStorage.getItem(SETTINGS_KEY);
      if (rawSettings) {
        const settings = JSON.parse(rawSettings) as { locale?: unknown; currency?: unknown };
        if (settings.locale === "en" || settings.locale === "ja") initialLocale = settings.locale;
        if (settings.currency === "JPY" || settings.currency === "USD" || settings.currency === "CNY") initialCurrency = settings.currency;
      }
    } catch {}

    queueMicrotask(() => {
      if (cancelled) return;
      setExpenses(initialExpenses);
      setLocale(initialLocale);
      setCurrency(initialCurrency);
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  }, [expenses, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ locale, currency }));
    document.documentElement.lang = locale;
  }, [currency, hydrated, locale]);

  const addExpense = (draft: ExpenseDraft) => {
    const expense: Expense = {
      ...draft,
      id: createId(),
      amount: Number(draft.amount),
      note: draft.note.trim().slice(0, 120),
      createdAt: new Date().toISOString(),
    };
    setExpenses((current) => [...current, expense]);
  };

  const updateExpense = (id: string, draft: ExpenseDraft) => {
    setExpenses((current) => current.map((expense) => expense.id === id
      ? { ...expense, ...draft, amount: Number(draft.amount), note: draft.note.trim().slice(0, 120) }
      : expense));
  };

  const deleteExpense = (id: string) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  const formatAmount = (amount: number) => new Intl.NumberFormat(
    locale === "ja" ? "ja-JP" : "en-US",
    { style: "currency", currency, maximumFractionDigits: currency === "JPY" ? 0 : 2 },
  ).format(amount);

  const value: LedgerContextValue = {
    expenses,
    hydrated,
    locale,
    currency,
    copy: MESSAGES[locale],
    addExpense,
    updateExpense,
    deleteExpense,
    clearExpenses: () => setExpenses([]),
    setLocale,
    setCurrency,
    formatAmount,
  };

  return <LedgerContext.Provider value={value}>{children}</LedgerContext.Provider>;
}

export function useLedger() {
  const context = useContext(LedgerContext);
  if (!context) throw new Error("useLedger must be used inside LedgerProvider");
  return context;
}
