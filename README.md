# Expense Ledger

使用 Next.js、React 与 TypeScript 构建的个人经费台账。数据保存在浏览器 `localStorage` 中，不会上传到服务器。

## 功能

- 经费新增、编辑、删除与搜索
- 按类别筛选并统计筛选结果
- 仪表盘、近期记录和类别分析
- 日语、英语界面切换
- JPY、USD、CNY 货币格式切换
- 自动迁移旧版 `expense-ledger:v1` 本地数据
- React 安全文本渲染，避免用户备注造成 HTML 注入
- 响应式桌面和移动端界面

## 本地运行

```bash
npm install
npm run dev
```

访问 <http://localhost:3000>。

## 验证

```bash
npm run lint
npm run typecheck
npm run build
```

## 数据说明

经费记录保存在当前浏览器的 `expense-ledger:v2` 键中。清除浏览器站点数据会同时删除台账记录。
