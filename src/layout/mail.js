export const send_mail_schema = [
  {
    "name": "sender",
    "type": "string",
    "label": "差出人",
    "required": true,
    "read_only": true,
  },
  {
    "name": "recipient_list",
    "type": "string",
    "label": "宛先",
    "required": true,
    "help_text": "カンマ区切りで複数のメールを分けてください。",
  },
  {
    "name": "cc_list",
    "type": "string",
    "label": "ＣＣ",
    "help_text": "カンマ区切りで複数のメールを分けてください。",
  },
  {
    "name": "bcc_list",
    "type": "string",
    "label": "ＢＣＣ",
    "help_text": "カンマ区切りで複数のメールを分けてください。",
  },
  {
    "name": "mail_title",
    "type": "string",
    "label": "件名",
    "required": true,
  },
  {
    "name": "attachment_list",
    "type": "choices",
    "label": "添付ファイル",
    "required": true,
  },
  {
    "name": "mail_body",
    "type": "text",
    "label": "メール本文",
    "required": true,
  },
  {
    "name": "pass_title",
    "type": "string",
    "label": "パスワード通知メールの題名",
    "help_text": "設定してない場合は「送信メールのタイトル」を使う。",
  },
  {
    "name": "pass_body",
    "type": "text",
    "label": "パスワード本文",
  },
];
