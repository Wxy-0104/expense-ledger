"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLedger } from "@/components/ledger/LedgerProvider";

const navItems = [
  { key: "dashboard", href: "/dashboard", icon: "⌂" },
  { key: "expenses", href: "/expenses", icon: "↗" },
  { key: "analytics", href: "/analytics", icon: "◫" },
  { key: "settings", href: "/settings", icon: "⚙" },
] as const;

export default function AppSidebar() {
  const pathname = usePathname();
  const { copy } = useLedger();

  return (
    <aside className="sidebar">
      <Link className="brand" href="/dashboard" aria-label="Expense Ledger">
        <span className="brand-mark">EL</span>
        <span>
          <strong>Expense Ledger</strong>
          <small>{copy.sidebar.tagline}</small>
        </span>
      </Link>

      <nav aria-label={copy.sidebar.navigation}>
        <ul className="nav-list">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link className={`nav-link${isActive ? " active" : ""}`} href={item.href}>
                  <span aria-hidden="true">{item.icon}</span>
                  {copy.sidebar[item.key]}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="sidebar-note">{copy.sidebar.privateNote}</p>
    </aside>
  );
}
