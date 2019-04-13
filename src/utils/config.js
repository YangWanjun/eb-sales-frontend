export const hostApi = 'http://127.0.0.1:8001';

export const config = {
  api: {
    authenticate: hostApi + '/api/token-auth/',
    me: hostApi + '/api/me/',
    member_list: hostApi + '/api/members/',
    partner_list: hostApi + '/api/partners/',
    client_list: hostApi + '/api/client/',
    client_detail: hostApi + '/api/client/%s/',
    project_list: hostApi + '/api/vproject/',
    project_detail: hostApi + '/api/project/%s/',
    project_member_list: hostApi + '/api/project_member/',
    turnover_monthly_list: hostApi + '/api/turnover/monthly',
    turnover_monthly_chart: hostApi + '/api/turnover/monthly/chart',
    turnover_yearly_chart: hostApi + '/api/turnover/yearly/chart',
    turnover_division_monthly_chart: hostApi + '/api/turnover/division/monthly/chart',
    turnover_clients_by_month: hostApi + '/api/turnover/clients_by_month/',
    turnover_clients_by_month_detail: hostApi + '/api/turnover/clients_by_month/%s/',
    turnover_client_by_month: hostApi + '/api/turnover/project/',
    turnover_client_by_month_detail: hostApi + '/api/turnover/project/%s/',
    turnover_project_by_month: hostApi + '/api/turnover/member/',
  },
  rowsPerPage: 15,
};
