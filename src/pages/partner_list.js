import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import { config } from '../utils/config';


class PartnerList extends React.Component {
  render () {
    return (
      <DataProvider endpoint={ config.api.partner_list } 
                    render={ (data, filters, handleDataRedraw) => <EnhancedTable tableTitle='協力会社一覧' data={data} filters={filters} onDataRedraw={handleDataRedraw} isSelectable={false} /> } />
    );
  }
}

export default PartnerList;
