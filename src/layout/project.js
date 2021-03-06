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
    "name": "customer_id",
    "type": "integer",
    "label": "関連会社ＩＤ",
    "min_value": 0,
    "max_value": 4294967295,
    "visible": false,
  },
  {
    "name": "customer_name",
    "type": "string",
    "label": "関連会社名称",
    "max_length": 50,
    "visible": true,
    "sortable": true,
    "sort_field": "customer_name",
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
];

export const list_project_attendance = [
  {
    "name": "member_name",
    "type": "string",
    "label": "名前",
    "visible": true,
  },
  {
    "name": "total_hours",
    "type": "decimal",
    "label": "合計時間",
    "visible": true,
  },
  {
    "name": "total_hours_bp",
    "type": "decimal",
    "label": "ＢＰ作業時間",
    "visible": true,
  },
  {
    "name": "extra_hours",
    "type": "decimal",
    "label": "残業時間",
    "visible": true,
  },
  {
    "name": "price",
    "type": "integer",
    "label": "金額",
    "visible": true,
  },
  {
    "name": "comment",
    "type": "string",
    "label": "備考",
    "visible": true,
  },
  {
    "name": "base_price",
    "type": "integer",
    "label": "単価",
    "visible": true,
  },
  {
    "name": "min_hours",
    "type": "decimal",
    "label": "最小",
    "visible": true,
  },
  {
    "name": "max_hours",
    "type": "decimal",
    "label": "最大",
    "visible": true,
  },
  {
    "name": "minus_per_hour",
    "type": "integer",
    "label": "減（円）",
    "visible": true,
  },
  {
    "name": "plus_per_hour",
    "type": "integer",
    "label": "増（円）",
    "visible": true,
  },
];

export const detail_project_schema = [
  {
    "name": 'organization__name',
    "type": "string",
    "label": "所属部署",
  },
  {
    "name": "customer__name",
    "type": "string",
    "label": "関連会社",
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
  },
  {
    "name": "manager__name",
    "type": "string",
    "label": "案件責任者",
  },
  {
    "name": "contact__name",
    "type": "string",
    "label": "案件連絡者",
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
  },
  {
    "name": "description",
    "type": "string",
    "label": "案件概要",
  },
  {
    "name": "address1",
    "type": "string",
    "label": "作業場所",
  },
  {
    "name": "nearest_station",
    "type": "string",
    "label": "最寄駅",
  },
  {
    "name": "attendance_type",
    "type": "choice",
    "label": "出勤の計算区分",
    "choices": [
      {
          "value": "1",
          "display_name": "１５分ごと"
      },
      {
          "value": "2",
          "display_name": "３０分ごと"
      },
      {
          "value": "3",
          "display_name": "１時間ごと"
      },
    ],
  },
  {
    "name": "min_hours",
    "type": "decimal",
    "label": "基準時間",
  },
  {
    "name": "max_hours",
    "type": "decimal",
    "label": "最大時間",
  },
  {
    "name": "is_hourly_pay",
    "type": "boolean",
    "label": "時給",
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
    "styles": {
      "5": {'backgroundColor': 'grey'}
    },
  },
  {
    "name": "updated_dt",
    "type": "datetime",
    "label": "更新日時",
  },
];

export const detail_project_lump_schema = [
  {
    "name": 'organization__name',
    "type": "string",
    "label": "所属部署",
  },
  {
    "name": "customer__name",
    "type": "string",
    "label": "関連会社",
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
  },
  {
    "name": "manager__name",
    "type": "string",
    "label": "案件責任者",
  },
  {
    "name": "contact__name",
    "type": "string",
    "label": "案件連絡者",
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
  },
  {
    "name": "description",
    "type": "string",
    "label": "案件概要",
  },
  {
    "name": "address1",
    "type": "string",
    "label": "作業場所",
  },
  {
    "name": "nearest_station",
    "type": "string",
    "label": "最寄駅",
  },
  {
    "name": "attendance_type",
    "type": "choice",
    "label": "出勤の計算区分",
    "choices": [
      {
          "value": "1",
          "display_name": "１５分ごと"
      },
      {
          "value": "2",
          "display_name": "３０分ごと"
      },
      {
          "value": "3",
          "display_name": "１時間ごと"
      },
    ],
  },
  {
    "name": "min_hours",
    "type": "decimal",
    "label": "基準時間",
  },
  {
    "name": "max_hours",
    "type": "decimal",
    "label": "最大時間",
  },
  {
    "name": "is_hourly_pay",
    "type": "boolean",
    "label": "時給",
  },
  {
    "name": "is_lump",
    "type": "boolean",
    "label": "一括案件",
  },
  {
    "name": "lump_amount",
    "type": "integer",
    "label": "一括金額",
  },
  {
    "name": "lump_comment",
    "type": "string",
    "label": "一括の備考",
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
    "styles": {
      "5": {'backgroundColor': 'grey'}
    },
  },
  {
    "name": "updated_dt",
    "type": "datetime",
    "label": "更新日時",
  },
];

export const detail_project_attendance = [
  {
    "name": "customer__name",
    "type": "string",
    "label": "関連会社",
  },
  {
    "name": "attendance_type",
    "type": "choice",
    "label": "出勤の計算区分",
    "choices": [
      {
          "value": "1",
          "display_name": "１５分ごと"
      },
      {
          "value": "2",
          "display_name": "３０分ごと"
      },
      {
          "value": "3",
          "display_name": "１時間ごと"
      },
    ],
  },
  {
    "name": "tax_rate",
    "type": "choice",
    "label": "税率",
    "choices": [
      {
          "value": "0.00",
          "display_name": "税なし"
      },
      {
          "value": "0.05",
          "display_name": "５％"
      },
      {
          "value": "0.08",
          "display_name": "８％"
      },
      {
        "value": "0.10",
        "display_name": "１０％"
    },
  ],
  },
  {
    "name": "decimal_type",
    "type": "choice",
    "label": "小数の処理区分",
    "choices": [
      {
          "value": "0",
          "display_name": "四捨五入"
      },
      {
          "value": "1",
          "display_name": "切り捨て"
      },
      {
          "value": "2",
          "display_name": "切り上げ"
      },
    ],
  },
];

export const edit_project_schema = [
  {
    "name": 'organization',
    "type": "choice",
    "label": "所属部署",
  },
  {
    "name": "customer",
    "type": "field",
    "required": true,
    "label": "関連会社",
    "display_field": 'customer__name',
    "search_url": '/api/customer/',
  },
  {
    "name": "business_type",
    "type": "choice",
    "required": true,
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
  },
  {
    "name": "manager",
    "type": "field",
    "required": true,
    "label": "案件責任者",
    "display_field": 'manager__name',
    "search_url": '/api/customer-member/',
  },
  {
    "name": "contact",
    "type": "field",
    "label": "案件連絡者",
    "display_field": 'contact__name',
    "search_url": '/api/customer-member/',
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
  },
  {
    "name": "description",
    "type": "text",
    "label": "案件概要",
  },
  {
    "name": "address1",
    "type": "string",
    "label": "作業場所",
  },
  {
    "name": "nearest_station",
    "type": "string",
    "required": true,
    "label": "最寄駅",
  },
  {
    "name": "attendance_type",
    "type": "choice",
    "required": true,
    "label": "出勤の計算区分",
    "choices": [
      {
          "value": "1",
          "display_name": "１５分ごと"
      },
      {
          "value": "2",
          "display_name": "３０分ごと"
      },
      {
          "value": "3",
          "display_name": "１時間ごと"
      },
    ],
  },
  {
    "name": "min_hours",
    "type": "decimal",
    "label": "基準時間",
  },
  {
    "name": "max_hours",
    "type": "decimal",
    "label": "最大時間",
  },
  {
    "name": "is_hourly_pay",
    "type": "boolean",
    "label": "時給",
    "help_text": "時給が設定したら、単価などの精算条件が無視される",
  },
  {
    "name": "is_lump",
    "type": "boolean",
    "label": "一括案件",
  },
  {
    "name": "lump_amount",
    "type": "integer",
    "label": "一括金額",
    'min_value': 0,
  },
  {
    "name": "lump_comment",
    "type": "string",
    "label": "一括の備考",
  },
  {
    "name": "status",
    "type": "choice",
    "required": true,
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
    "styles": {
      "5": {'backgroundColor': 'grey'}
    },
  },
  {
    "name": "updated_dt",
    "type": "datetime",
    "label": "更新日時",
  },
];

export const edit_attendance_schema = [
  {
    "name": "member_name",
    "type": "field",
    "label": "メンバー",
    "read_only": true,
  },
  {
    "name": "total_hours",
    "type": "decimal",
    "label": "合計時間",
    "required": true,
    'min_value': 0,
    'step': 0.25,
  },
  {
    "name": "total_hours_bp",
    "type": "decimal",
    "label": "ＢＰ作業時間",
    'min_value': 0,
    'step': 0.25,
  },
  {
    "name": "extra_hours",
    "type": "decimal",
    "label": "残業時間",
    "required": true,
    'step': 0.25,
  },
  {
    "name": "price",
    "type": "integer",
    "label": "金額",
    "required": true,
    'min_value': 0,
  },
  {
    "name": "comment",
    "type": "string",
    "label": "備考",
  },
  {
    "name": "base_price",
    "type": "integer",
    "label": "単価",
    "read_only": true,
  },
  {
    "name": "min_hours",
    "type": "decimal",
    "label": "最小",
    "read_only": true,
  },
  {
    "name": "max_hours",
    "type": "decimal",
    "label": "最大",
    "read_only": true,
  },
  {
    "name": "minus_per_hour",
    "type": "integer",
    "label": "減（円）",
    "read_only": true,
  },
  {
    "name": "plus_per_hour",
    "type": "integer",
    "label": "増（円）",
    "read_only": true,
  },
];
