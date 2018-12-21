import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import { api } from '../utils/config';


class TurnoverMonthlyList extends React.Component {
  render () {
    return (
      <DataProvider endpoint={ api.turnover_monthly_list } 
                    render={ (data, filters, handleDataRedraw) => <EnhancedTable tableTitle='月別売上一覧' data={data} filters={filters} onDataRedraw={handleDataRedraw} isSelectable={false} /> } />
    );
  }
}

export default TurnoverMonthlyList;
