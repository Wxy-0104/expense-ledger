const STORAGE_KEY = 'expense-ledger:v1';
const LANG_KEY = 'expense-ledger:lang:v1';

const I18N = {
  en: {
    app_title: 'Expense Ledger',
    app_subtitle: 'Personal reimbursement record tool',
    lang_label: 'Language',

    btn_add_expense: '+ Add Expense',
    btn_cancel: 'Cancel',
    btn_save: 'Save',
    btn_edit: 'Edit',
    btn_delete: 'Delete',

    placeholder_search: 'Search Notes...',
    placeholder_note: 'Optional note',

    filter_all_categories: 'All Categories',
    cat_transport: 'Transport',
    cat_meal: 'Meal',
    cat_office: 'Office',
    cat_other: 'Other',

    pay_cash: 'Cash',
    pay_card: 'Card',

    summary_total_records: 'Total Records',
    summary_total_amount: 'Total Amount:',

    table_date: 'Date',
    table_category: 'Category',
    table_amount: 'Amount',
    table_payment: 'Payment',
    table_receipt: 'Receipt',
    table_note: 'Note',
    table_actions: 'Actions',

    label_date: 'Date',
    label_category: 'Category',
    label_amount: 'Amount',
    label_payment: 'Payment',
    label_receipt: 'Receipt',
    label_note: 'Note',

    modal_add: 'Add',
    modal_edit: 'Edit',

    receipt_yes: 'Yes',
    receipt_no: 'No',

    confirm_delete: 'Delete this record?',

    error_date_required: 'Date is required.',
    error_category_required: 'Category is required.',
    error_amount_invalid: 'Amount must be 0 or greater.'
  },
  ja: {
    app_title: '経費台帳',
    app_subtitle: '個人精算の記録ツール',
    lang_label: '言語',

    btn_add_expense: '+ 経費を追加',
    btn_cancel: 'キャンセル',
    btn_save: '保存',
    btn_edit: '編集',
    btn_delete: '削除',

    placeholder_search: 'メモを検索...',
    placeholder_note: '任意のメモ',

    filter_all_categories: 'すべてのカテゴリ',
    cat_transport: '交通',
    cat_meal: '食事',
    cat_office: '事務',
    cat_other: 'その他',

    pay_cash: '現金',
    pay_card: 'カード',

    summary_total_records: '合計件数',
    summary_total_amount: '合計金額:',

    table_date: '日付',
    table_category: 'カテゴリ',
    table_amount: '金額',
    table_payment: '支払',
    table_receipt: '領収書',
    table_note: 'メモ',
    table_actions: '操作',

    label_date: '日付',
    label_category: 'カテゴリ',
    label_amount: '金額',
    label_payment: '支払',
    label_receipt: '領収書',
    label_note: 'メモ',

    modal_add: '追加',
    modal_edit: '編集',

    receipt_yes: 'あり',
    receipt_no: 'なし',

    confirm_delete: 'この記録を削除しますか？',

    error_date_required: '日付は必須です。',
    error_category_required: 'カテゴリは必須です。',
    error_amount_invalid: '金額は0以上の数値で入力してください。'
  }
};

function normalizeLang(value) {
  if (value === 'ja') return 'ja';
  return 'en';
}

function getLang() {
  return normalizeLang(localStorage.getItem(LANG_KEY));
}

function setLang(lang) {
  const normalized = normalizeLang(lang);
  localStorage.setItem(LANG_KEY, normalized);
  applyI18n();
  render();
}

function t(key) {
  const lang = getLang();
  const table = I18N[lang] || I18N.en;
  return table[key] ?? I18N.en[key] ?? key;
}

function applyI18n() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.title = t('app_title');

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });

  if (dom.langSelect) {
    dom.langSelect.value = lang;
  }
}

const dom = {
  addBtn: document.getElementById('addBtn'),
  searchInput: document.getElementById('searchInput'),
  categoryFilter: document.getElementById('categoryFilter'),
  totalCount: document.getElementById('totalCount'),
  totalAmount: document.getElementById('totalAmount'),
  expenseBody: document.getElementById('expenseBody'),
  modal: document.getElementById('modal'),
  modalTitle: document.getElementById('modalTitle'),
  expenseForm: document.getElementById('expenseForm'),
  fDate: document.getElementById('f-date'),
  fCategory: document.getElementById('f-category'),
  fAmount: document.getElementById('f-amount'),
  fPayment: document.getElementById('f-payment'),
  fReceipt: document.getElementById('f-receipt'),
  fNote: document.getElementById('f-note'),
  formError: document.getElementById('formError'),
  cancelBtn: document.getElementById('cancelBtn'),
  langSelect: document.getElementById('langSelect')
};

const state = {
  expenses: [],
  editingId: null,
  filters: {
    keyword: '',
    category: ''
  }
};

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      state.expenses = parsed.map((item) => ({
        id: item.id,
        date: item.date || '',
        category: item.category || '',
        amount: Number(item.amount) || 0,
        payment: item.payment || '',
        receipt: Boolean(item.receipt),
        note: item.note || ''
      }));
    }
  } catch {
    state.expenses = [];
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
}

function openModal(mode, expense) {
  dom.formError.textContent = '';

  if (mode === 'edit' && expense) {
    state.editingId = expense.id;
    dom.modalTitle.textContent = t('modal_edit');
    dom.fDate.value = expense.date;
    dom.fCategory.value = expense.category;
    dom.fAmount.value = String(expense.amount);
    dom.fPayment.value = expense.payment;
    dom.fReceipt.checked = expense.receipt;
    dom.fNote.value = expense.note;
  } else {
    state.editingId = null;
    dom.modalTitle.textContent = t('modal_add');
    dom.expenseForm.reset();
    dom.fReceipt.checked = false;
  }

  dom.modal.classList.add('show');
}

function closeModal() {
  state.editingId = null;
  dom.formError.textContent = '';
  dom.expenseForm.reset();
  dom.fReceipt.checked = false;
  dom.modal.classList.remove('show');
}

function validateForm() {
  const date = dom.fDate.value.trim();
  const category = dom.fCategory.value;
  const amount = Number(dom.fAmount.value);

  if (!date) return t('error_date_required');
  if (!category) return t('error_category_required');
  if (Number.isNaN(amount) || amount < 0) return t('error_amount_invalid');

  return '';
}

function readFormData() {
  return {
    date: dom.fDate.value.trim(),
    category: dom.fCategory.value,
    amount: Number(dom.fAmount.value),
    payment: dom.fPayment.value,
    receipt: dom.fReceipt.checked,
    note: dom.fNote.value.trim()
  };
}

function bindEvents() {
  if (dom.langSelect) {
    dom.langSelect.addEventListener('change', () => {
      setLang(dom.langSelect.value);
    });
  }

  dom.addBtn.addEventListener('click', () => {
    openModal('add');
  });

  dom.cancelBtn.addEventListener('click', () => {
    closeModal();
  });

  dom.modal.addEventListener('click', (event) => {
    if (event.target === dom.modal) {
      closeModal();
    }
  });

  dom.expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const error = validateForm();
    if (error) {
      dom.formError.textContent = error;
      return;
    }

    const data = readFormData();

    if (state.editingId !== null) {
      const index = state.expenses.findIndex((e) => e.id === state.editingId);
      if (index !== -1) {
        state.expenses[index] = { ...state.expenses[index], ...data };
      }
    } else {
      const nextId = state.expenses.length
        ? Math.max(...state.expenses.map((e) => e.id)) + 1
        : 1;
      state.expenses.push({ id: nextId, ...data });
    }

    saveToStorage();
    closeModal();
    render();
  });

  dom.searchInput.addEventListener('input', () => {
    state.filters.keyword = dom.searchInput.value.trim().toLowerCase();
    render();
  });

  dom.categoryFilter.addEventListener('change', () => {
    state.filters.category = dom.categoryFilter.value;
    render();
  });

  dom.expenseBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('button[data-action]')) return;

    const id = Number(target.dataset.id);
    const action = target.dataset.action;
    const expense = state.expenses.find((e) => e.id === id);
    if (!expense) return;

    if (action === 'edit') {
      openModal('edit', expense);
      return;
    }

    if (action === 'delete') {
      const ok = confirm(t('confirm_delete'));
      if (!ok) return;
      state.expenses = state.expenses.filter((e) => e.id !== id);
      saveToStorage();
      render();
    }
  });
}

function labelForCategory(value) {
  const key = `cat_${value}`;
  const translated = t(key);
  if (translated === key) return value;
  return translated;
}

function labelForPayment(value) {
  const key = `pay_${value}`;
  const translated = t(key);
  if (translated === key) return value;
  return translated;
}

function matchesFilter(expense) {
  const keyword = state.filters.keyword;
  const category = state.filters.category;

  const haystack = [
    expense.date,
    expense.category,
    expense.payment,
    expense.note,
    labelForCategory(expense.category),
    labelForPayment(expense.payment)
  ].join(' ').toLowerCase();

  if (keyword && !haystack.includes(keyword)) return false;
  if (category && expense.category !== category) return false;
  return true;
}

function render() {
  const visible = state.expenses.filter(matchesFilter);

  dom.totalCount.textContent = String(visible.length);
  const totalAmount = visible.reduce((sum, e) => sum + e.amount, 0);
  dom.totalAmount.textContent = totalAmount.toFixed(2);

  dom.expenseBody.innerHTML = visible.map((e) => {
    const receiptText = e.receipt ? t('receipt_yes') : t('receipt_no');
    const noteText = e.note || '-';
    const categoryText = labelForCategory(e.category);
    const paymentText = labelForPayment(e.payment);

    return `
      <tr>
        <td>${e.date}</td>
        <td>${categoryText}</td>
        <td>${e.amount.toFixed(2)}</td>
        <td>${paymentText}</td>
        <td>${receiptText}</td>
        <td>${noteText}</td>
        <td>
          <button data-action="edit" data-id="${e.id}">${t('btn_edit')}</button>
          <button data-action="delete" data-id="${e.id}">${t('btn_delete')}</button>
        </td>
      </tr>
    `;
  }).join('');
}

loadFromStorage();
applyI18n();
bindEvents();
render();
