import React from 'react';
import {
  Typography,
  Paper,
  Toolbar,
} from '@material-ui/core';
import HierarchyTable from '../components/Table/HierarchyTable';
import DataProvider from '../components/Table/DataProvider';
import {
  list_organization_schema,
} from '../layout/organization';
import { config } from '../utils/config';


class OrganizationList extends React.Component {
  render () {
    return (
      <Paper>
        <Toolbar>
          <Typography variant="subtitle1">
            {'部署一覧'}
          </Typography>
        </Toolbar>
        <DataProvider
          endpoint={ config.api.organization.quick_list }
          render={ (initData) => (
            <HierarchyTable
              tableHead={list_organization_schema}
              tableData={initData.data.results}
            />
          ) } 
        />
      </Paper>
    );
  }
}

export default OrganizationList;
