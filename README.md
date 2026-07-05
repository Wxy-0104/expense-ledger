# Expense Ledger

React + TypeScript で開発した支出管理アプリケーションです。

以前 Vanilla JavaScript で作成した支出管理アプリを、
React と TypeScript を使用して再構築しました。

このプロジェクトでは、コンポーネント設計、Props によるデータ受け渡し、
State 管理、型定義、LocalStorage によるデータ永続化などを実装しています。

## 主な機能

- 支出データの追加
- 支出一覧の表示
- 既存データの編集
- データの削除
- メモ内容によるリアルタイム検索
- カテゴリーによる絞り込み
- LocalStorage によるデータ保存
- 日本語 / 英語の言語切り替え
- 追加と編集で同じフォームコンポーネントを再利用

## 使用技術

- React
- TypeScript
- Vite
- CSS
- LocalStorage

## プロジェクト構成
```text
src/
├── components/
│   ├── ExpenseForm.tsx
│   ├── ExpenseFilter.tsx
│   ├── ExpenseList.tsx
│   ├── ExpenseItem.tsx
│   └── LanguageSwitcher.tsx
├── i18n/
│   └── texts.ts
├── types/
│   ├── expense.ts
│   └── language.ts
├── utils/
│   └── date.ts
├── App.tsx
└── main.tsx
```
## 設計について

アプリケーションのメインデータとフォームの State は、
`App.tsx` で管理しています。

各子コンポーネントには Props を通してデータとイベント処理用の関数を渡しています。

データの流れ：
```text
App
↓ expenses
ExpenseList
↓ expense
ExpenseItem
```

編集処理：
```text
ExpenseItem
→ startEdit(id)
→ App で対象データを取得
→ Form の State を更新
→ ExpenseForm にデータを反映
```

追加処理と編集処理では同じフォームを使用しています。

`editingId` の状態によって、
新規追加と既存データの更新処理を切り替えています。

## データ保存

支出データは LocalStorage に保存しています。

`expenses` State の変更を `useEffect` で監視し、
追加・編集・削除後のデータを自動的に保存します。

ページを再読み込みした場合も、保存されたデータを初期値として読み込みます。

## 起動方法

npm install

npm run dev

## 今後の改善予定

- UI デザインの改善
- レスポンシブ対応
- バリデーション処理の改善
- コンポーネント構成の整理
