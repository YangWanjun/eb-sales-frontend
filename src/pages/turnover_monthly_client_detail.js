import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import { api } from '../utils/config';


class TurnoverMonthlyClientDetail extends React.Component {

  render () {
    const { params } = this.props.match;
    const tableTitle = params.ym.substring(0, 4) + '年' + params.ym.substring(4, 6) + '月売上詳細';
    const api_url = api.turnover_client_by_month 
      + '?year=' + params.ym.substring(0, 4) 
      + '&month=' + params.ym.substring(4, 6)
      + '&client_id=' + params.client_id;
    return (
      <DataProvider endpoint={ api_url } 
                    render={ (data, filters, handleDataRedraw) => <EnhancedTable tableTitle={tableTitle} data={data} filters={filters} onDataRedraw={handleDataRedraw} isSelectable={false} /> } />
    );
  }
}

export default TurnoverMonthlyClientDetail;
