import React from 'react';
import { Link } from 'react-router-dom'
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../../components/customBreadcrumbs';
import EnhancedTable from '../../containers/EnhancedTable';
import DataProvider from '../../components/Table/DataProvider';
import {
  list_member_schema
} from '../../layout/member';
import { config } from '../../utils/config';


class MemberList extends React.Component {
  render () {
    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/member" >メンバー</Link>
          <Typography color="textPrimary">メンバー一覧</Typography>
        </CustomBreadcrumbs>
        <DataProvider
          endpoint={ config.api.member.quick_list }
          render={ (initData) => (
            <EnhancedTable
              tableTitle='作業メンバー一覧'
              { ...initData }
              columns={list_member_schema}
              isClientSide={true}
            />
          ) } 
        />
      </div>
    );
  }
}

export {MemberList};
