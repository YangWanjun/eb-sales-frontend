export const config = {
  api: {
    member_list: 'http://192.168.99.100:8001/api/members/',
    partner_list: 'http://192.168.99.100:8001/api/partners/',
    client_list: 'http://192.168.99.100:8001/api/client/',
    client_detail: 'http://192.168.99.100:8001/api/client/%s/',
    turnover_monthly_list: 'http://192.168.99.100:8001/api/turnover/monthly',
    turnover_monthly_chart: 'http://192.168.99.100:8001/api/turnover/monthly/chart',
    turnover_yearly_chart: 'http://192.168.99.100:8001/api/turnover/yearly/chart',
    turnover_division_monthly_chart: 'http://192.168.99.100:8001/api/turnover/division/monthly/chart',
    turnover_clients_by_month: 'http://192.168.99.100:8001/api/turnover/clients_by_month/',
    turnover_client_by_month: 'http://192.168.99.100:8001/api/turnover/client_by_month/',
  },
  rowsPerPage: 15,
};
