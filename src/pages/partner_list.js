import React from 'react';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import {
  list_partner_schema,
} from '../layout/partner';
import { config } from '../utils/config';

class PartnerList extends React.Component {
  render () {
    return (
      <DataProvider
        endpoint={ config.api.partner_view_list }
        render={ (initData) => (
          <EnhancedTable
            tableTitle='協力会社一覧'
            { ...initData }
            columns={list_partner_schema}
            isClientSide={true}
          />
        ) } 
      />
    );
  }
}

export default PartnerList;
