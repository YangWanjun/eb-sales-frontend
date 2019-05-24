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
  edit_member_organization_schema,
} from '../layout/member';
import { config } from '../utils/config';
import { common } from '../utils/common';
import { constant } from '../utils/constants';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
});

class MemberDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      member: {},
      organizations: [],
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_project_detail = common.formatStr(config.api.member_detail, params.member_id) + '?schema=1';
    common.fetchGet(url_project_detail).then(data => {
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
  }

  checkDepartment(data) {
    const {division, department, section} = data;
    if (!division && !department && !section) {
      return [
        {name: 'division', message: common.formatStr(constant.ERROR.REQUIRE_FIELD, '所属部署')},
        {name: 'department', message: common.formatStr(constant.ERROR.REQUIRE_FIELD, '所属部署')},
        {name: 'section', message: common.formatStr(constant.ERROR.REQUIRE_FIELD, '所属部署')},
      ];
    } else {
      return true;
    }
  }

  calcPlusMinus(name, data) {
    if (['price', 'min_hours', 'max_hours'].indexOf(name) > -1) {
      const {price, min_hours, max_hours} = data;
      const plus_per_hour = Math.round(price / max_hours);
      const minus_per_hour = Math.round(price / min_hours);
      return { minus_per_hour, plus_per_hour };
    } else {
      return null;
    }
  }

  render () {
    const { member, organizations } = this.state;
    const { params } = this.props.match;
    const formProjectProps = {
      schema: edit_member_schema,
      title: member.full_name + 'を変更',
      edit_url: common.formatStr(config.api.member_detail, params.member_id),
    };
    let colOrg = common.getColumnByName(edit_member_organization_schema, 'organization', 'name');
    colOrg['choices'] = organizations;
    const formMemberOrganizationProps = {
      schema: edit_member_organization_schema,
      layout: [],
      title: member.full_name + 'に所属部署を設定',
      checker: [this.checkDepartment],
      // onChanges: [this.calcPlusMinus],
      data: {
        member: params.member_id,
        member_name: member.full_name,
      },
      add_url: config.api.member_organization_period_list,
      edit_url: config.api.member_organization_period_detail,
    };

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/member" >作業メンバー一覧</Link>
          <Link to={"/member/" + params.member_id} >{member.full_name}</Link>
          <Typography color="textPrimary">詳細</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={member.full_name + 'の詳細情報'}
          data={member}
          schema={detail_member_schema}
          formComponentProps={formProjectProps}
          deleteUrl={common.formatStr(config.api.member_detail, params.member_id)}
        />
        <DataProvider 
          endpoint={ config.api.member_organization_period_list + '?member=' + params.member_id } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='所属部署'
                { ...initData }
                columns={list_organization_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formMemberOrganizationProps}
                deleteUrl={config.api.member_organization_period_detail}
              />
            );
          } }
        />
        {/* { project_detail.id ? (
          <DataProvider 
            endpoint={ common.formatStr(config.api.project_attendance_list, project_detail.id)} 
            render={ (initData) => {
              return (
                <EnhancedTable
                  tableTitle='出勤年月一覧'
                  { ...initData }
                  columns={project_attendance_list_schema}
                  isClientSide={true}
                  selectable='none'
                />
              );
            } }
          />
        ) : <React.Fragment />} */}
      </div>
    );
  }
}

export default withStyles(styles)(MemberDetail);
