import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import DetailPanel from '../containers/detail';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import {
  detail_member_schema,
  edit_member_schema,
  list_organization_schema,
  list_salesperson_schema,
  edit_member_organization_schema,
  edit_salesperson_schema,
} from '../layout/member';
import {
  list_bp_contract_schema,
  edit_bp_contract_schema,
  edit_bp_contract_layout,
} from '../layout/partner_member';
import {
  setPriceMemo,
  checkDepartment,
} from './common';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
});

class PartnerMember extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      partner: {},
      member: {},
      organizations: [],
      salesperson: [],
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_detail = common.formatStr(config.api.partner_detail, params.partner_id);
    common.fetchGet(url_detail).then(data => {
      this.setState({
        partner: data,
      });
    });
    const url_member_detail = common.formatStr(config.api.member.detail, params.member_id) + '?schema=1';
    common.fetchGet(url_member_detail).then(data => {
      this.setState({
        member: data,
      });
    });
    // 事業部一覧を初期化する
    common.fetchGet(config.api.organization_list).then(data => {
      let organizations = [];
      data.results.map(row => (
        organizations.push({value: row.id, display_name: row.name, parent: row.parent, disabled: row.is_on_sales !== true})
      ));
      this.setState({organizations});
    });
    // 営業担当一覧を初期化する
    common.fetchGet(config.api.salesperson.list).then(data => {
      let salesperson = [];
      data.results.map(row => (
        salesperson.push({value: row.id, display_name: row.full_name})
      ));
      this.setState({salesperson});
    });
  }

  render () {
    const { partner, member, organizations, salesperson } = this.state;
    const { params } = this.props.match;
    const formProjectProps = {
      schema: edit_member_schema,
      title: member.full_name + 'を変更',
      edit_url: common.formatStr(config.api.member.detail, params.member_id),
    };
    // 所属部署の設定
    let colOrg = common.getColumnByName(edit_member_organization_schema, 'organization', 'name');
    colOrg['choices'] = organizations;
    const formMemberOrganizationProps = {
      schema: edit_member_organization_schema,
      layout: [],
      title: member.full_name + 'に所属部署を設定',
      checker: [checkDepartment],
      data: {
        member: params.member_id,
        member_name: member.full_name,
      },
      add_url: config.api.organization_period.list,
      edit_url: config.api.organization_period.detail,
    };
    // 営業担当の設定
    let colSalesperson = common.getColumnByName(edit_salesperson_schema, 'salesperson', 'name');
    colSalesperson['choices'] = salesperson;
    const formSalespersonProps = {
      schema: edit_salesperson_schema,
      layout: [],
      title: member.full_name + 'に営業員を設定',
      data: {
        member: params.member_id,
        member_name: member.full_name,
      },
      add_url: config.api.salesperson_period.list,
      edit_url: config.api.salesperson_period.detail,
    };
    // ＢＰ契約設定
    const formContractProps = {
      schema: edit_bp_contract_schema,
      layout: edit_bp_contract_layout,
      title: member.full_name + 'の契約を設定',
      data: {
        company: params.partner_id,
        member: params.member_id,
      },
      onChanges: [setPriceMemo],
      add_url: config.api.partner_member_contract_list,
      edit_url: config.api.partner_member_contract_detail,
    };

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/partner" >協力会社一覧</Link>
          <Link to={'/partner/' + params.partner_id} >{partner.name}</Link>
          <Link to={'/partner/' + params.partner_id + '/members'} >作業メンバー一覧</Link>
          <Typography color="textPrimary">{member.full_name}</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={member.full_name + 'の詳細情報'}
          data={member}
          schema={detail_member_schema}
          formComponentProps={formProjectProps}
        />
        <DataProvider 
          endpoint={ common.formatStr(config.api.member.organization_periods, params.member_id) } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='所属部署'
                { ...initData }
                columns={list_organization_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formMemberOrganizationProps}
                deleteUrl={config.api.organization_period.detail}
              />
            );
          } }
        />
        <DataProvider 
          endpoint={ common.formatStr(config.api.member.salesperson_periods, params.member_id) } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='営業担当一覧'
                { ...initData }
                columns={list_salesperson_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formSalespersonProps}
                deleteUrl={config.api.salesperson_period.detail}
              />
            );
          } }
        />
        <DataProvider 
          endpoint={ common.formatStr(config.api.partner_member_contract_list, params.member_id) } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='契約一覧'
                { ...initData }
                columns={list_bp_contract_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formContractProps}
                deleteUrl={config.api.partner_member_contract_detail}
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(PartnerMember);
