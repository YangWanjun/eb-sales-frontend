export const list_organization_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "部署名称",
    "url_field": 'url',
  },
  {
    "name": "member_count",
    "type": "integer",
    "label": "人数",
  },
  {
    "name": "leaders",
    "type": "string",
    "label": "事業部長／部長／課長",
  },
];

export const detail_organization_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "部署名称",
  },
  {
    "name": "description",
    "type": "text",
    "label": "概要",
  },
  {
    "name": "org_type",
    "type": "choice",
    "label": "組織類別",
    "choices": [
      {"value": '01', 'display_name': '事業部'},
      {"value": '02', 'display_name': '部署'},
      {"value": '03', 'display_name': '課'},
    ],
  },
  {
    "name": "is_on_sales",
    "type": "boolean",
    "label": "営業対象",
  },
  {
    "name": "parent_name",
    "type": "string",
    "label": "親組織",
    "url_field": 'parent_url',
  },
];

export const edit_organization_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "部署名称",
    "required": true,
  },
  {
    "name": "description",
    "type": "text",
    "label": "概要",
  },
  {
    "name": "org_type",
    "type": "choice",
    "label": "組織類別",
    "choices": [
      {"value": '01', 'display_name': '事業部'},
      {"value": '02', 'display_name': '部署'},
      {"value": '03', 'display_name': '課'},
    ],
    "required": true,
  },
  {
    "name": "is_on_sales",
    "type": "boolean",
    "label": "営業対象",
  },
  {
    "name": "parent",
    "type": "choice",
    "label": "親組織",
    "choices": [],
  },
];

export const list_position_ship_schema = [
  {
    "name": "member_name",
    "type": "string",
    "label": "名前",
  },
  {
    "name": "position",
    "type": "choice",
    "label": "職位",
    "choices": [
      { "value": '1.0', "display_name": "代表取締役" },
      { "value": '1.1', "display_name": "取締役" },
      { "value": '3.0', "display_name": "事業部長" },
      { "value": '3.1', "display_name": "副事業部長" },
      { "value": '4.0', "display_name": "部長" },
      { "value": '5.0', "display_name": "担当部長" },
      { "value": '6.0', "display_name": "課長" },
      { "value": '7.0', "display_name": "担当課長" },
      { "value": '8.0', "display_name": "PM" },
      { "value": '9.0', "display_name": "リーダー" },
      { "value": '10.0', "display_name": "サブリーダー" },
      { "value": '11.0', "display_name": "勤務統計者" },
    ],
  },
  {
    "name": "is_part_time",
    "type": "boolean",
    "label": "兼任",
  },
];

export const edit_position_ship_schema = [
  {
    "name": "member",
    "type": "field",
    "label": "名前",
    "search_url": "/api/member/search?schema=1",
    "display_field": 'member_name',
    "required": true,
  },
  {
    "name": "position",
    "type": "choice",
    "label": "職位",
    "choices": [
      { "value": '1.0', "display_name": "代表取締役" },
      { "value": '1.1', "display_name": "取締役" },
      { "value": '3.0', "display_name": "事業部長" },
      { "value": '3.1', "display_name": "副事業部長" },
      { "value": '4.0', "display_name": "部長" },
      { "value": '5.0', "display_name": "担当部長" },
      { "value": '6.0', "display_name": "課長" },
      { "value": '7.0', "display_name": "担当課長" },
      { "value": '8.0', "display_name": "PM" },
      { "value": '9.0', "display_name": "リーダー" },
      { "value": '10.0', "display_name": "サブリーダー" },
      { "value": '11.0', "display_name": "勤務統計者" }
    ],
    "required": true,
  },
  {
    "name": "is_part_time",
    "type": "boolean",
    "label": "兼任",
  },
];
