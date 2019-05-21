export const list_order_schema = [
  {
    "name": "ym",
    "type": "string",
    "label": "対象年月",
    "visible": true,
  },
  {
    "name": "name",
    "type": "string",
    "label": "注文書名称",
    "visible": true,
  },
  {
    "name": "order_no",
    "type": "string",
    "label": "注文番号",
    "visible": true,
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
    "visible": true,
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
    "visible": true,
  },
  {
    "name": "contract_type",
    "type": "choice",
    "label": "契約形態",
    "visible": true,
    "choices": [
      {
        "value": "01",
        "display_name": "業務委託"
      },
      {
        "value": "02",
        "display_name": "準委任"
      },
      {
        "value": "03",
        "display_name": "派遣"
      },
      {
        "value": "04",
        "display_name": "一括"
      },
      {
        "value": "10",
        "display_name": "出向"
      },
      {
        "value": "99",
        "display_name": "その他"
      },
    ],
  },
  {
    "name": "request_no",
    "type": "string",
    "label": "請求書番号",
    "visible": true,
    "url_field": "request_detail_url",
  },

];

export const edit_order_schema = [
  {
    "name": "projects",
    "type": "fields",
    "label": "案件",
    "required": true,
    "search_url": '/api/project/search?schema=1',
  },
  {
    "name": "name",
    "type": "string",
    "label": "注文書名称",
    "required": true,
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
    "required": true,
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
    "required": true,
  },
  {
    "name": "order_no",
    "type": "string",
    "label": "注文番号",
    "required": true,
  },
  {
    "name": "order_date",
    "type": "date",
    "label": "注文日",
    "required": true,
  },
  {
    "name": "contract_type",
    "type": "choice",
    "label": "契約形態",
    "required": true,
    "choices": [
      {
        "value": "01",
        "display_name": "業務委託"
      },
      {
        "value": "02",
        "display_name": "準委任"
      },
      {
        "value": "03",
        "display_name": "派遣"
      },
      {
        "value": "04",
        "display_name": "一括"
      },
      {
        "value": "10",
        "display_name": "出向"
      },
      {
        "value": "99",
        "display_name": "その他"
      },
    ],
  },
  {
    "name": "bank_account",
    "type": "choice",
    "label": "振込先口座",
    "required": true,
  },

];

export const create_form_schema = [
  {
    "name": "contract_name",
    "type": "string",
    "label": "注文書名称",
    "required": true,
  },
  {
    "name": "order_no",
    "type": "string",
    "label": "注文番号",
    "required": true,
  },
  {
    "name": "bank_account_id",
    "type": "choice",
    "label": "振込先口座",
    "required": true,
  },
];
