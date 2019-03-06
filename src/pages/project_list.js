import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import { config } from '../utils/config';


class ProjectList extends React.Component {
  render () {
    return (
      <DataProvider endpoint={ config.api.project_list } 
                    render={ (data, filters, handleDataRedraw) => <EnhancedTable tableTitle='案件一覧' data={data} filters={filters} onDataRedraw={handleDataRedraw} isSelectable={false} /> } />
    );
  }
}

export default ProjectList;
