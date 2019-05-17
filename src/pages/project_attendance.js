import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Button,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import DetailPanel from '../containers/detail';
import EnhancedTable from '../containers/dataTable';
import DataProvider from '../components/dataProvider';
import {
  detail_project_attendance,
  list_project_attendance,
  edit_attendance_schema
} from '../layout/project';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class ProjectAttendance extends React.Component {
  constructor(props) {
    super(props);

    this.calcPrice = this.calcPrice.bind(this);
    this.state = { 
      project_detail: {},
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_project_detail = common.formatStr(config.api.project_detail, params.project_id) + '?schema=1';
    common.fetchGet(url_project_detail).then(data => {
      this.setState({
        project_detail: data,
        columns: data.columns,
      });
    });
  }

  calcPrice(name, data) {
    const { project_detail } = this.state;
    const { base_price, min_hours, max_hours, minus_per_hour, plus_per_hour } = data;
    if (name === 'total_hours') {
      let { total_hours } = data;
      total_hours = common.getAttendanceHours(total_hours, project_detail.attendance_type);
      let extra_hours = 0,
          price = base_price;
      if (min_hours && total_hours < min_hours) {
        extra_hours = total_hours - min_hours;
        price = minus_per_hour ? (base_price + minus_per_hour * extra_hours) : base_price;
      } else if (max_hours && total_hours > max_hours) {
        extra_hours = total_hours - max_hours;
        price = plus_per_hour ? (base_price + plus_per_hour * extra_hours) : base_price;
      }
      return { extra_hours, price: common.getInteger(price, project_detail.decimal_type) };
    } else if (name === 'extra_hours') {
      const extra_hours = data.extra_hours;
      let price = 0;
      if (extra_hours < 0) {
        price = minus_per_hour ? (base_price + minus_per_hour * extra_hours) : base_price;
      } else {
        price = plus_per_hour ? (base_price + plus_per_hour * extra_hours) : base_price;
      }
      return { price: common.getInteger(price, project_detail.decimal_type) };
    } else {
      return null;
    }
  }

  render() {
    const { classes } = this.props;
    const { project_detail } = this.state;
    const { params } = this.props.match;
    const url = common.formatStr(config.api.project_attendance, params.project_id, params.year, params.month);
    const prevMonth = common.getPrevMonth(params.year, params.month);
    const nextMonth = common.getNextMonth(params.year, params.month);
    // 勤務入力
    const formMemberProps = {
      schema: edit_attendance_schema,
      title: common.formatStr('%s年%s月勤務時間入力', params.year, params.month),
      onChanges: [this.calcPrice],
      add_url: config.api.project_attendance_add,
      edit_url: config.api.project_attendance_detial,
    };

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/project" >案件一覧</Link>
          <Link to={common.formatStr("/project/%s", params.project_id)} >{ project_detail.name }</Link>
          <Typography color="textPrimary">{params.year}年{params.month}月勤務時間入力</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={project_detail.name}
          data={project_detail}
          schema={detail_project_attendance}
          actions={[
            (
              <Link key='prev_month' to={common.formatStr('/project/%s/attendance/%s/%s', project_detail.id, prevMonth.getFullYear(), common.zeroPad(prevMonth.getMonth() + 1, 2))}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  先月
                </Button>
              </Link>    
            ),
            (
              <Link key='next_month' to={common.formatStr('/project/%s/attendance/%s/%s', project_detail.id, nextMonth.getFullYear(), common.zeroPad(nextMonth.getMonth() + 1, 2))}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  次月
                </Button>
              </Link>    
            ),
          ]}
        />
        <DataProvider 
          endpoint={ url } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle={common.formatStr('%s年%s月勤務時間', params.year, params.month)}
                { ...initData }
                columns={list_project_attendance}
                selectable='single'
                isClientSide={true}
                formComponentProps={formMemberProps}
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProjectAttendance);
