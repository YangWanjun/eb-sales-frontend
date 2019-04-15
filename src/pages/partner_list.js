import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import { config } from '../utils/config';


class PartnerList extends React.Component {
  render () {
    return (
      <DataProvider
        endpoint={ config.api.partner_list }
        render={ (initData) => (
          <EnhancedTable
            tableTitle='協力会社一覧'
            { ...initData }
          />
        ) } 
      />
    );
  }
}

export default PartnerList;
