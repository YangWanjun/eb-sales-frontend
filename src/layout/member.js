export const list_member_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "名前",
    'searchable': true,
    "url_field": "url",
  },
  {
    "name": "division_name",
    "type": "string",
    "label": "事業部",
  },
  {
    "name": "department_name",
    "type": "string",
    "label": "部署",
  },
  {
    "name": "section_name",
    "type": "string",
    "label": "課",
  },
  {
    "name": "partner_name",
    "type": "string",
    "label": "協力会社",
    'searchable': true,
  },
  {
    "name": "is_working",
    "type": "boolean",
    "label": "稼働",
    'searchable': true,
  },
  {
    "name": "release_date",
    "type": "date",
    "label": "リリース予定日",
  },
  {
    "name": "salesperson_name",
    "type": "string",
    "label": "営業員",
    'searchable': true,
  },
  {
    "name": "salesoff_reason_name",
    "type": "string",
    "label": "営業対象外",
  },
  {
    "name": "is_retired",
    "type": "boolean",
    "label": "退職",
    "visible": false,
    "styles": {
      1: {'backgroundColor': 'lightgray'}
    },
    'searchable': true,
  },
];

export const list_project_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "案件名称",
    "url_field": "url",
  },
  {
    "name": "start_date",
    "type": "string",
    "label": "開始日",
  },
  {
    "name": "end_date",
    "type": "string",
    "label": "終了日",
  },
  {
    "name": "division_name",
    "type": "string",
    "label": "事業部",
  },
];

export const list_organization_schema = [
  {
    "name": "division_name",
    "type": "string",
    "label": "事業部",
    "url_field": "url",
  },
  {
    "name": "department_name",
    "type": "string",
    "label": "部署",
  },
  {
    "name": "section_name",
    "type": "string",
    "label": "課",
  },
  {
    "name": "start_date",
    "type": "string",
    "label": "開始日",
  },
  {
    "name": "end_date",
    "type": "string",
    "label": "終了日",
  },
];
