import React from 'react';
import { Link } from 'react-router-dom'
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import StepForm from '../components/Form/StepForm';
import {
  list_member_schema,
} from '../layout/partner_member';
import { config } from '../utils/config';
import { common } from '../utils/common';

class PartnerMembers extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      partner: {},
    };
    this.initialize(props.match.params);
　}

  initialize(params) {
    const url_detail = common.formatStr(config.api.partner_detail, params.pk);
    common.fetchGet(url_detail).then(data => {
      this.setState({
        partner: data,
      });
    });
  }

  render () {
    const { params } = this.props.match;
    const { partner } = this.state;
    // 作業メンバー編集
    // const formMemberProps = {
    //   schema: add_project_member_schema,
    // }

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/partner" >協力会社一覧</Link>
          <Link to={'/partner/' + params.pk} >{partner.name}</Link>
          <Typography color="textPrimary">作業メンバー一覧</Typography>
        </CustomBreadcrumbs>
        <DataProvider
          endpoint={ common.formatStr(config.api.partner_member_list, params.pk) }
          render={ (initData) => (
            <EnhancedTable
              tableTitle='作業メンバー一覧'
              { ...initData }
              columns={list_member_schema}
              isClientSide={true}
              selectable={'single'}
              // formComponentProps={formMemberProps}
            />
          ) } 
        />
        <StepForm/>
      </div>
    );
  }
}

export default PartnerMembers;
