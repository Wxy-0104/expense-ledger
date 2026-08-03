import type { Metadata } from "next";
import AppSidebar from "@/components/layout/AppSidebar";
import { LedgerProvider } from "@/components/ledger/LedgerProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Expense Ledger",
    template: "%s | Expense Ledger",
  },
  description: "A private, browser-based expense ledger with local persistence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <LedgerProvider>
          <div className="app-shell">
            <AppSidebar />
            <div className="page-shell">{children}</div>
          </div>
        </LedgerProvider>
      </body>
    </html>
  );
}
