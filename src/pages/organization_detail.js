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
  detail_organization_schema,
  edit_organization_schema,
  list_position_ship_schema,
  edit_position_ship_schema,
  list_organization_member_schema,
} from '../layout/organization';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    color: 'white',
  },
});

class OrganizationDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      organization: {},
      organizations: [],
    };
    this.initialize(props.match.params);
　}

  initialize(params) {
    const url_detail = common.formatStr(config.api.organization.detail, params.pk);
    common.fetchGet(url_detail).then(data => {
      this.setState({
        organization: data,
      });
    });
    // 組織一覧を初期化する
    common.fetchGet(config.api.organization.list).then(data => {
      let organizations = [];
      data.results.map(row => (
        organizations.push({value: row.id, display_name: row.name, parent: row.parent, disabled: row.is_on_sales !== true})
      ));
      this.setState({organizations});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.match.params) !== JSON.stringify(this.props.match.params)) {
      this.initialize(nextProps.match.params);
    }
  }

  render() {
    const { params } = this.props.match;
    const { organization, organizations } = this.state;
    // 部署を変更する
    // 所属部署の設定
    let colOrg = common.getFromJsonList(edit_organization_schema, 'name', 'parent');
    colOrg['choices'] = organizations;
    const formOrganizationProps = {
      schema: edit_organization_schema,
      title: organization.name + 'を変更',
      edit_url: common.formatStr(config.api.organization.detail, params.pk),
    };
    // 職位を設定する
    const formPositionShipProps = {
      schema: edit_position_ship_schema,
      layout: [],
      title: organization.name + 'に職位を設定',
      data: {
        organization: params.pk,
      },
      add_url: config.api.position_ship.list,
      edit_url: config.api.position_ship.detail,
    };

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/organization" >部署一覧</Link>
          <Typography color="textPrimary">{organization.name}</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={organization.name}
          data={organization}
          schema={detail_organization_schema}
          formComponentProps={formOrganizationProps}
          deleteUrl={common.formatStr(config.api.organization.detail, params.pk)}
          deletedNext="/organization"
        />
        <DataProvider 
          endpoint={ common.formatStr(config.api.organization.positions, params.pk) } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='職位一覧'
                { ...initData }
                columns={list_position_ship_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formPositionShipProps}
                deleteUrl={config.api.position_ship.detail}
              />
            );
          } }
        />
        <DataProvider 
          endpoint={ common.formatStr(config.api.organization.members, params.pk) } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle={organization.name + ' のメンバー一覧'}
                { ...initData }
                columns={list_organization_member_schema}
                isClientSide={true}
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(OrganizationDetail);
