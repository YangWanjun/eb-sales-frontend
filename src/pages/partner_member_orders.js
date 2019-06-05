import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Paper,
  Toolbar,
} from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import SendIcon from '@material-ui/icons/Send'
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import HierarchyTable from '../components/Table/HierarchyTable';
import {
  list_bp_contract_schema,
  edit_bp_contract_schema,
  edit_bp_contract_layout,
  list_bp_member_orders_schema,
} from '../layout/partner_member';
import {
  setPriceMemo,
} from './common';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
});

class PartnerMemberOrders extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      partner: {},
      member: {},
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
    const url_member_detail = common.formatStr(config.api.member_detail, params.member_id) + '?schema=1';
    common.fetchGet(url_member_detail).then(data => {
      this.setState({
        member: data,
      });
    });
  }

  createMemberOrder(data) {
    console.log(data);
  }

  render () {
    const { partner, member } = this.state;
    const { params } = this.props.match;
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
          <Link to={'/partner/' + params.partner_id + '/members/' + params.member_id} >{member.full_name}</Link>
          <Typography color="textPrimary">ＢＰ注文書</Typography>
        </CustomBreadcrumbs>
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
        <Paper>
          <Toolbar>
            <Typography variant="title">
              {(member.full_name || '') + ' の注文書履歴'}
            </Typography>
          </Toolbar>
          <DataProvider
            endpoint={ common.formatStr(config.api.partner_member_orders, params.partner_id, params.member_id) }
            render={ (initData) => (
              <HierarchyTable
                tableHead={list_bp_member_orders_schema}
                tableData={initData.data.results}
                actions={[
                  {
                    'icon': <NoteAddIcon />,
                    'tooltip': '注文書と注文請書を作成',
                    'handleClick': this.createMemberOrder,
                  },
                  {
                    'icon': <SendIcon />,
                    'tooltip': '注文書と注文請書を送信',
                    'handleClick': this.createMemberOrder,
                  },
                ]}
              />
            ) }
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(PartnerMemberOrders);
