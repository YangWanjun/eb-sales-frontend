import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Button,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import DetailPanel from '../containers/detail';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import { detail_project_schema, detail_project_lump_schema, edit_project_schema } from '../layout/project';
import {
  project_member_list_schema,
  add_project_member_schema,
  add_layout,
  project_attendance_list_schema,
} from '../layout/project_member';
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

    this.handleDataUpdated = this.handleDataUpdated.bind(this);
    this.state = { 
      member: {},
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
  }

  checkAssignDate(data) {
    const {start_date, end_date} = data;
    if (start_date && end_date && start_date > end_date) {
      return [
        {name: 'start_date', message: common.formatStr(constant.ERROR.DATE_CONTRADICT, '開始日', '終了日')},
        {name: 'end_date', message: common.formatStr(constant.ERROR.DATE_CONTRADICT, '開始日', '終了日')},
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

  handleDataUpdated(newData) {
    let { project_detail } = this.state;
    Object.assign(project_detail, newData);
    this.setState({project_detail});
  }

  render () {
    const { classes } = this.props;
    const { member } = this.state;
    const { params } = this.props.match;

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/member" >作業メンバー一覧</Link>
          <Link to={"/member/" + params.member_id} >{member.full_name}</Link>
          <Typography color="textPrimary">詳細</Typography>
        </CustomBreadcrumbs>
        {/* <DetailPanel
          title={member.full_name}
          data={project_detail}
          schema={project_detail.is_lump ? detail_project_lump_schema : detail_project_schema}
          formComponentProps={formProjectProps}
          sendDataUpdated={this.handleDataUpdated}
          deleteUrl={common.formatStr(config.api.project_detail, project_detail.id)}
          actions={project_actions}
        /> */}
        {/* <DataProvider 
          endpoint={ config.api.project_member_list + '?project=' + params.project_id } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='メンバー一覧'
                { ...initData }
                columns={project_member_list_schema}
                isClientSide={true}
                selectable='multiple'
                formComponentProps={formMemberProps}
                deleteUrl={config.api.project_member_delete + '?project=' + params.project_id}
              />
            );
          } }
        />
        { project_detail.id ? (
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
