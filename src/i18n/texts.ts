import type { Language } from '../types/language';

export const texts = {
    en: {
        title: "Expense Ledger",
        add: "Add",
        save: "Save",
        edit: "Edit",
        delete: "Delete",
        amount: "Amount",
        note: "Note",
        searchNote: "Search by note",
        category: "Category",
        transport: "Transport",
        food: "Food",
        office: "Office",
        other: "Other",
        payment: "Payment",
        cash: "Cash",
        card: "Card",
        receipt: "Receipt",
        noReceipt: "No Receipt",
        noData: "No expense records",
        allCategories: "All Categories"
    },
    ja: {
        title: "家計簿",
        add: "追加",
        save: "保存",
        edit: "編集",
        delete: "削除",
        amount: "金額",
        note: "メモ",
        searchNote: "メモで検索",
        category: "カテゴリー",
        transport: "交通費",
        food: "食費",
        office: "事務用品",
        other: "その他",
        payment: "支払い方法",
        cash: "現金",
        card: "カード",
        receipt: "領収書",
        noReceipt: "領収書なし",
        noData: "支出記録がありません",
        allCategories: "すべてのカテゴリー"
    }
} satisfies Record<Language, Record<string, string>>;