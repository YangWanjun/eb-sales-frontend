import React from 'react';
import HierarchyTable from '../components/Table/HierarchyTable';
import DataProvider from '../components/Table/DataProvider';
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody.jsx";
import {
  list_organization_schema,
} from '../layout/organization';
import { config } from '../utils/config';


class OrganizationList extends React.Component {
  render () {
    return (
      <Card>
        <CardBody>
          <DataProvider
            endpoint={ config.api.organization_view_list }
            render={ (initData) => (
              <HierarchyTable
                tableHead={list_organization_schema}
                tableData={initData.data.results}
              />
            ) } 
          />
        </CardBody>
      </Card>
    );
  }
}

export default OrganizationList;
