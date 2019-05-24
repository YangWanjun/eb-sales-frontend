export const hostApi = 'http://192.168.99.100:8001';

export const config = {
  api: {
    authenticate: hostApi + '/api/token-auth/',
    me: hostApi + '/api/me/',
    member_list: hostApi + '/api/members/',
    member_detail: hostApi + '/api/member/%s/',
    member_details: hostApi + '/api/member/%s/details/',
    member_organization_period_list: hostApi + '/api/organization-period/',
    member_organization_period_detail: hostApi + '/api/organization-period/%s/',
    organization_list: hostApi + '/api/organization',
    organization_division_list: hostApi + '/api/organization-division/',
    partner_list: hostApi + '/api/partners/',
    client_list: hostApi + '/api/client/',
    client_detail: hostApi + '/api/client/%s/',
    project_list: hostApi + '/api/vproject/',
    project_detail: hostApi + '/api/project/%s/',
    project_member_list: hostApi + '/api/project_member/',
    project_member_edit: hostApi + '/api/project_member/%s/',
    project_member_delete: hostApi + '/api/project_member/%s/',
    project_attendance_list: hostApi + '/api/project/%s/attendance',
    project_attendance: hostApi + '/api/project/%s/attendance/%s/%s',
    project_attendance_add: hostApi + '/api/member-attendance/',
    project_attendance_detial: hostApi + '/api/member-attendance/%s/',
    project_stage_list: hostApi + '/api/project-stage/',
    project_order_list: hostApi + '/api/project/%s/order',
    project_order_add: hostApi + '/api/client-order/',
    project_order_detail: hostApi + '/api/client-order/%s/',
    project_request_html: hostApi + '/api/project/request/%s',
    project_request_create: hostApi + '/api/project/%s/order/%s/request/create/%s/%s',
    turnover_monthly_list: hostApi + '/api/turnover/monthly',
    turnover_monthly_chart: hostApi + '/api/turnover/monthly/chart',
    turnover_yearly_chart: hostApi + '/api/turnover/yearly/chart',
    turnover_division_monthly_chart: hostApi + '/api/turnover/division/monthly/chart',
    turnover_clients_by_month: hostApi + '/api/turnover/clients_by_month/',
    turnover_clients_by_month_detail: hostApi + '/api/turnover/clients_by_month/%s/',
    turnover_client_by_month: hostApi + '/api/turnover/project/',
    turnover_client_by_month_detail: hostApi + '/api/turnover/project/%s/',
    turnover_project_by_month: hostApi + '/api/turnover/member/',
    mst_bank_account_list: hostApi + '/api/bank-account/',
    attachment_download: hostApi + '/api/attachment/download/%s',
  },
  rowsPerPage: 15,
  toastHideDuration: 6000,
  rowsPerPageOptions: [5, 10, 15, 25, 50],
};
