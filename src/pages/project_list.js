import React from 'react';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import { list_schema } from '../layout/project';
import { config } from '../utils/config';
import { common } from '../utils/common';


class ProjectList extends React.Component {
  render () {
    const params = common.parseQuerystring(this.props.location.search, '&', '=', true);

    return (
      <DataProvider
        endpoint={ config.api.project_list }
        params={params}
        render={ (initData) => (
          <EnhancedTable
            tableTitle='案件一覧'
            { ...initData }
            columns={list_schema}
            endpoint={ this.props.location.pathname }
          />
        ) } 
      />
    );
  }
}

export default ProjectList;
