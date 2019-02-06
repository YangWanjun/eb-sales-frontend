import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import { api } from '../utils/config';


class TurnoverMonthlyDetail extends React.Component {

  render () {
    const { params } = this.props.match;
    const tableTitle = params.ym.substring(0, 4) + '年' + params.ym.substring(4, 6) + '月売上詳細';
    return (
      <DataProvider endpoint={ api.turnover_clients_by_month } 
                    render={ (data, filters, handleDataRedraw) => <EnhancedTable tableTitle={tableTitle} data={data} filters={filters} onDataRedraw={handleDataRedraw} isSelectable={false} /> } />
    );
  }
}

export default TurnoverMonthlyDetail;
