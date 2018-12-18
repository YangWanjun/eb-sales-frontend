import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import { api } from '../utils/config';


class PartnerList extends React.Component {
  render () {
    return (
      <DataProvider endpoint={ api.partner_list } 
                    render={ (data, handleChangePage) => <EnhancedTable tableTitle='協力会社一覧' data={data} onPageChange={handleChangePage} isSelectable={false} /> } />
    );
  }
}

export default PartnerList;
