import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import EnhancedTable from '../containers/dataTable';
import DataProvider from '../components/dataProvider';
import BadgeLabel from '../components/badgeLabel';
import { list_schema, add_schema, add_layout } from '../layout/project_member';
import { config } from '../utils/config';
import { common } from '../utils/common';
import { constant } from '../utils/constants';

const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cellHeader: {
    textAlign: 'right',
    width: '25%',
    minWidth: 100,
  },
  cardStyle: {
    marginTop: 0,
    marginBottom: 15,
  },
});

class ProjectDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      project_detail: {},
      columns: [],
      project_stages: [],
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
    // 作業工程の選択肢を取得
    common.fetchGet(config.api.project_stage_list).then(data => {
      let project_stages = [];
      data.results.map(row => (
        project_stages.push({value: row.id, display_name: row.name})
      ));
      this.setState({project_stages});
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

  render () {
    const { classes } = this.props;
    const { project_detail, columns, project_stages } = this.state;
    const { params } = this.props.match;
    const col_business_type = common.getColumnByName(columns, 'business_type');
    const col_status = common.getColumnByName(columns, 'status');
    const col_attendance_type = common.getColumnByName(columns, 'attendance_type');
    const business_type = col_business_type ? col_business_type.choices[project_detail.business_type] : '';
    const status = col_status ? col_status.choices[project_detail.status] : '';
    const statusClass = col_status ? col_status.choiceClasses[project_detail.status] : '';
    const attendance_type = col_attendance_type ? col_attendance_type.choices[project_detail.attendance_type] : '';

    // 作業工程の選択肢を設定
    let column = common.getColumnByName(add_schema, 'stages', 'name');
    column.choices = project_stages;
    // メンバー追加設定
    const formProps = {
      schema: add_schema,
      layout: add_layout,
      title: project_detail.name + 'にメンバー追加',
      checker: [this.checkAssignDate],
      onChanges: [this.calcPlusMinus],
      data: {
        project: project_detail.id,
        min_hours: project_detail.min_hours,
        max_hours: project_detail.max_hours,
      },
      add_url: config.api.project_member_list,
      edit_url: config.api.project_member_edit + '?project=' + params.project_id,
    };

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/project" >案件一覧</Link>
          <Typography color="textPrimary">{ project_detail.name }</Typography>
        </CustomBreadcrumbs>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={ classes.cardStyle }>
              <CardBody>
                <h3>{ project_detail.name }</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>関連会社</TableCell>
                      <TableCell>{ project_detail.client__name }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>事業分類</TableCell>
                      <TableCell>{ business_type }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>案件責任者</TableCell>
                      <TableCell>{ project_detail.manager__name }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>案件連絡者</TableCell>
                      <TableCell>{ project_detail.contact__name }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>開始日</TableCell>
                      <TableCell>{ project_detail.start_date }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>終了日</TableCell>
                      <TableCell>{ project_detail.end_date }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>作業場所</TableCell>
                      <TableCell>{ project_detail.address1 }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>最寄駅</TableCell>
                      <TableCell>{ project_detail.nearest_station }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>案件概要</TableCell>
                      <TableCell>{ project_detail.description }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>出勤の計算区分</TableCell>
                      <TableCell>{ attendance_type }</TableCell>
                    </TableRow>
                    { project_detail.is_hourly_pay ? (
                      <React.Fragment>
                        <TableRow>
                          <TableCell className={classes.cellHeader}>時給</TableCell>
                          <TableCell>はい</TableCell>
                        </TableRow>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <TableRow>
                          <TableCell className={classes.cellHeader}>基準時間</TableCell>
                          <TableCell>{ project_detail.min_hours }</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.cellHeader}>最大時間</TableCell>
                          <TableCell>{ project_detail.max_hours }</TableCell>
                        </TableRow>
                      </React.Fragment>
                    ) }
                    { project_detail.is_lump ? (
                      <React.Fragment>
                        <TableRow>
                          <TableCell className={classes.cellHeader}>一括案件</TableCell>
                          <TableCell>はい</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.cellHeader}>一括金額</TableCell>
                          <TableCell>{ common.toNumComma(project_detail.lump_amount) }</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.cellHeader}>一括の備考</TableCell>
                          <TableCell>{ project_detail.lump_comment }</TableCell>
                        </TableRow>
                      </React.Fragment>
                    ) : (<React.Fragment />)}
                    <TableRow>
                      <TableCell className={classes.cellHeader}>状態</TableCell>
                      <TableCell>
                        <BadgeLabel color={statusClass} badgeContent={ status } />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
              <CardFooter chart>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <DataProvider 
          endpoint={ config.api.project_member_list + '?project=' + params.project_id } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='メンバー一覧'
                { ...initData }
                columns={list_schema}
                isClientSide={true}
                selectable='multiple'
                formComponentProps={formProps}
                deleteUrl={config.api.project_member_delete + '?project=' + params.project_id}
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProjectDetail);
