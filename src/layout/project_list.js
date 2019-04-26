export const list_schema = [
  {
    "name": "id",
    "type": "integer",
    "label": "ID",
    "visible": false,
  },
  {
    "name": "name",
    "type": "string",
    "label": "案件名称",
    "max_length": 50,
    "visible": true,
    "url_field": "url",
    "sortable": true,
    "sort_field": "name",
    "searchable": true,
    "search_type": "icontains"
  },
  {
    "name": "client_id",
    "type": "integer",
    "label": "関連会社ＩＤ",
    "min_value": 0,
    "max_value": 4294967295,
    "visible": false,
  },
  {
    "name": "client_name",
    "type": "string",
    "label": "関連会社名称",
    "max_length": 50,
    "visible": true,
    "sortable": true,
    "sort_field": "client_name",
    "searchable": true,
    "search_type": "icontains"
  },
  {
    "name": "business_type",
    "type": "choice",
    "label": "事業分類",
    "choices": [
      {
        "value": "01",
        "display_name": "金融（銀行）"
      },
      {
        "value": "02",
        "display_name": "金融（保険）"
      },
      {
        "value": "03",
        "display_name": "金融（証券）"
      },
      {
        "value": "04",
        "display_name": "製造"
      },
      {
        "value": "05",
        "display_name": "サービス"
      },
      {
        "value": "06",
        "display_name": "その他"
      }
    ],
    "visible": true,
    "sortable": true,
    "sort_field": "business_type",
    "searchable": true,
    "search_type": "iexact"
  },
  {
    "name": "salesperson_id",
    "type": "integer",
    "label": "営業ＩＤ",
    "min_value": 0,
    "max_value": 4294967295,
    "visible": false,
  },
  {
    "name": "salesperson_name",
    "type": "string",
    "label": "営業員",
    "max_length": 30,
    "visible": true,
    "sortable": true,
    "sort_field": "salesperson_name"
  },
  {
    "name": "member_name",
    "type": "string",
    "label": "メンバー",
    "max_length": 30,
    "visible": true,
    "sortable": true,
    "sort_field": "member_name"
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
    "visible": true,
    "sortable": true,
    "sort_field": "start_date"
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
    "visible": true,
    "sortable": true,
    "sort_field": "end_date"
  },
  {
    "name": "status",
    "type": "choice",
    "label": "ステータス",
    "choices": [
      {
        "value": "1",
        "display_name": "提案"
      },
      {
        "value": "2",
        "display_name": "予算審査"
      },
      {
        "value": "3",
        "display_name": "予算確定"
      },
      {
        "value": "4",
        "display_name": "実施中"
      },
      {
        "value": "5",
        "display_name": "完了"
      }
    ],
    "visible": false,
    "searchable": true,
    "search_type": "iexact",
    "styles": {
      "5": {'backgroundColor': 'lightgray'}
    },
  },
  {
    "name": "updated_dt",
    "type": "datetime",
    "label": "更新日時",
    "visible": true,
    "sortable": true,
    "sort_field": "updated_dt"
  },
  {
    "name": "url",
    "type": "string",
    "label": "Url",
    "visible": false,
  },
]