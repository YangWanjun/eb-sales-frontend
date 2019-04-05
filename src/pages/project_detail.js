import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import BadgeLabel from '../components/badgeLabel';
import { config } from '../utils/config';
import { common } from '../utils/common';

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
      project_member_schema: {},
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
    common.fetchOptions(config.api.project_member_list).then(data => {
      this.setState({ 
        project_member_schema: data.actions.POST,
      });
    });
  }

  render () {
    const { classes } = this.props;
    const { project_detail, columns, project_member_schema } = this.state;
    const { params } = this.props.match;
    const col_business_type = common.getColumnByName(columns, 'business_type');
    const col_status = common.getColumnByName(columns, 'status');
    const col_attendance_type = common.getColumnByName(columns, 'attendance_type');
    const business_type = col_business_type ? col_business_type.choices[project_detail.business_type] : '';
    const status = col_status ? col_status.choices[project_detail.status] : '';
    const statusClass = col_status ? col_status.choiceClasses[project_detail.status] : '';
    const attendance_type = col_attendance_type ? col_attendance_type.choices[project_detail.attendance_type] : '';

    const addProps = {
      schema: project_member_schema,
      title: project_detail.name + 'にメンバー追加',
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
          render={ (data, filters, handleDataRedraw) => {
            // 検索できる項目を設定
            data.columns.map(col => {
              if (col.id === 'member_name' || col.id === 'contract_type' || col.id === 'status' || col.id === 'is_working') {
                col.searchable = true;
                return col;
              } else {
                return col;
              }
            });
            return (
              <EnhancedTable
                tableTitle='メンバー一覧'
                data={data}
                filters={filters}
                onDataRedraw={handleDataRedraw}
                isClientSide={true}
                isSelectable={true}
                addComponentProps={addProps}
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProjectDetail);
