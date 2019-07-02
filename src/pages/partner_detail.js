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
  edit_partner_schema,
  list_partner_employee_schema,
  list_pay_notify_schema,
  edit_pay_notify_schema,
  list_bank_account_schema,
  edit_bank_account_schema,
} from '../layout/partner';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    color: 'white',
  },
});

class PartnerDetail extends React.Component {

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

  render() {
    const { params } = this.props.match;
    const { partner } = this.state;
    let colMember = common.getFromJsonList(edit_pay_notify_schema, 'name', 'member');
    colMember['dataSource'] = common.formatStr(config.api.partner_employee_choice, params.pk);
    const formPartnerProps = {
      schema: edit_partner_schema,
      title: partner.name + 'を変更',
      edit_url: common.formatStr(config.api.partner_detail, params.pk),
    };
    // 職位を設定する
    const formPartnerMemberProps = {
      schema: list_partner_employee_schema,
      layout: [],
      title: partner.name + ' に社員設定',
      data: {
        company: params.pk,
      },
      add_url: config.api.partner_employee_list,
      edit_url: config.api.partner_employee_detail,
    };
    // 支払通知書の宛先を設定する
    const formPayNotifyProps = {
      schema: edit_pay_notify_schema,
      layout: [],
      title: '支払通知書の宛先',
      data: {
        company: params.pk,
      },
      add_url: config.api.partner_pay_notify_recipient_list,
      edit_url: config.api.partner_pay_notify_recipient_detial,
    };
    // 協力会社銀行口座
    const formBankAccountProps = {
      schema: edit_bank_account_schema,
      layout: [],
      title: '協力会社銀行口座',
      data: {
        company: params.pk,
      },
      add_url: config.api.partner_bank_account_list,
      edit_url: config.api.partner_bank_account_detail,
    };

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/partner" >協力会社一覧</Link>
          <Link to={'/partner/' + params.pk} >{partner.name}</Link>
          <Typography color="textPrimary">変更</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={partner.name}
          data={partner}
          schema={edit_partner_schema}
          formComponentProps={formPartnerProps}
        />
        <DataProvider 
          endpoint={ config.api.partner_employee_list + '?company=' + params.pk } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle={partner.name + ' の社員一覧'}
                { ...initData }
                columns={list_partner_employee_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formPartnerMemberProps}
                deleteUrl={config.api.partner_employee_detail}
              />
            );
          } }
        />
        <DataProvider 
          endpoint={ config.api.partner_pay_notify_recipient_list + '?company=' + params.pk } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='支払通知書の宛先一覧'
                { ...initData }
                columns={list_pay_notify_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formPayNotifyProps}
                deleteUrl={config.api.partner_pay_notify_recipient_detial}
              />
            );
          } }
        />
        <DataProvider 
          endpoint={ config.api.partner_bank_account_list + '?company=' + params.pk } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='協力会社銀行口座一覧'
                { ...initData }
                columns={list_bank_account_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formBankAccountProps}
                deleteUrl={config.api.partner_bank_account_detail}
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(PartnerDetail);
