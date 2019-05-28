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
  list_partner_member_schema,
  list_pay_notify_schema,
  edit_pay_notify_schema,
} from '../layout/partner';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
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
    // // 部署を変更する
    // // 所属部署の設定
    // let colOrg = common.getColumnByName(edit_organization_schema, 'parent', 'name');
    // colOrg['choices'] = organizations;
    const formPartnerProps = {
      schema: edit_partner_schema,
      title: partner.name + 'を変更',
      edit_url: common.formatStr(config.api.partner_detail, params.pk),
    };
    // 職位を設定する
    const formPartnerMemberProps = {
      schema: list_partner_member_schema,
      layout: [],
      title: partner.name + ' に社員設定',
      data: {
        company: params.pk,
      },
      add_url: config.api.partner_member_list,
      edit_url: config.api.partner_member_detail,
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

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/partner" >協力会社一覧</Link>
          <Typography color="textPrimary">{partner.name}</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={partner.name}
          data={partner}
          schema={edit_partner_schema}
          formComponentProps={formPartnerProps}
        />
        <DataProvider 
          endpoint={ config.api.partner_member_list + '?company=' + params.pk } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle={partner.name + ' の社員一覧'}
                { ...initData }
                columns={list_partner_member_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formPartnerMemberProps}
                deleteUrl={config.api.partner_member_detail}
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
      </div>
    );
  }
}

export default withStyles(styles)(PartnerDetail);
