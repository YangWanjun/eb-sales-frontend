export const list_monthly_schema = [
  {
    "name": "ym",
    "type": "string",
    "label": "対象年月",
    "url_field": "url",
    "sortable": true,
  },
  {
    "name": "cost",
    "type": "integer",
    "label": "コスト",
    "sortable": true,
  },
  {
    "name": "turnover_amount",
    "type": "integer",
    "label": "売上（税別）",
    "sortable": true,
  },
  {
    "name": "tax_amount",
    "type": "integer",
    "label": "税金",
    "sortable": true,
  },
  {
    "name": "expenses_amount",
    "type": "integer",
    "label": "精算",
    "sortable": true,
  },
  {
    "name": "amount",
    "type": "integer",
    "label": "合計",
    "sortable": true,
  },
  {
    "name": "profit_amount",
    "type": "integer",
    "label": "粗利",
    "sortable": true,
  },
  {
    "name": "profit_rate",
    "type": "decimal",
    "label": "利率",
    "sortable": true,
  },
];

export const list_customers_monthly_schema = [
  {
    "name": "customer_name",
    "type": "string",
    "label": "会社名",
    "url_field": "url",
    "sortable": true,
    "searchable": true,
    "search_type": "icontains"
  },
  {
    "name": "cost",
    "type": "integer",
    "label": "コスト",
    "sortable": true,
  },
  {
    "name": "turnover_amount",
    "type": "integer",
    "label": "売上（税別）",
    "visible": true,
    "sortable": true,
  },
  {
    "name": "tax_amount",
    "type": "integer",
    "label": "税金",
    "sortable": true,
  },
  {
    "name": "expenses_amount",
    "type": "integer",
    "label": "精算",
    "sortable": true,
  },
  {
    "name": "amount",
    "type": "integer",
    "label": "合計",
    "sortable": true,
  },
  {
    "name": "profit_amount",
    "type": "integer",
    "label": "粗利",
    "sortable": true,
  },
  {
    "name": "profit_rate",
    "type": "decimal",
    "label": "利率",
    "sortable": true,
  },
];

export const list_projects_schema = [
  {
    "name": "project_name",
    "type": "string",
    "label": "案件名",
    "url_field": "url",
    "sortable": true,
    "searchable": true,
    "search_type": "icontains"
  },
  {
    "name": "cost",
    "type": "integer",
    "label": "コスト",
    "sortable": true,
  },
  {
    "name": "turnover_amount",
    "type": "integer",
    "label": "売上（税別）",
    "sortable": true,
  },
  {
    "name": "tax_amount",
    "type": "integer",
    "label": "税金",
    "sortable": true,
  },
  {
    "name": "expenses_amount",
    "type": "integer",
    "label": "精算",
    "sortable": true,
  },
  {
    "name": "amount",
    "type": "integer",
    "label": "合計",
    "sortable": true,
  },
  {
    "name": "profit_amount",
    "type": "integer",
    "label": "粗利",
    "sortable": true,
  },
  {
    "name": "profit_rate",
    "type": "decimal",
    "label": "利率",
    "sortable": true,
  },
];

export const list_project_member_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "社員",
    "sortable": true,
  },
  {
    "name": "org_name",
    "type": "string",
    "label": "所属名称",
    "sortable": true,
  },
  {
    "name": "cost",
    "type": "integer",
    "label": "コスト",
    "sortable": true,
  },
  {
    "name": "turnover_amount",
    "type": "integer",
    "label": "売上（税別）",
    "sortable": true,
  },
  {
    "name": "expenses_amount",
    "type": "integer",
    "label": "精算",
    "sortable": true,
  },
  {
    "name": "profit_amount",
    "type": "integer",
    "label": "粗利",
    "sortable": true,
  },
  {
    "name": "profit_rate",
    "type": "decimal",
    "label": "利率",
    "sortable": true,
  },
];
