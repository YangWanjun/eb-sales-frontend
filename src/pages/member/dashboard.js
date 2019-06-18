import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Icon,
} from "@material-ui/core";
import Accessibility from "@material-ui/icons/Accessibility";
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardIcon from "../../components/Card/CardIcon";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Danger from "../../components/Typography/Danger";
import Warning from "../../components/Typography/Warning";
import SimpleTable from "../../components/Table/SimpleTable";
import {
  list_member_dashboard_salesperson_schema,
} from "../../layout/member";
import { common } from '../../utils/common';
import { config } from '../../utils/config';

import dashboardStyle from "../../assets/jss/views/dashboardStyle.jsx";

function getWorkingStatusOption(data) {
  return {
    chart: {
      type: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: data.categories,
      labels: {
        style: {
           color: '#FFF',
        }
     },
    },
    yAxis: {
      visible: false,
    },
    legend: {
      align: 'left',
      floating: true,
      verticalAlign: 'top',
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>合計数: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        }
      }
    },
    series: data.series,
  };
}

function getSalespersonStatusOption(data) {
  return {
    chart: {
      type: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: data.categories,
    },
    yAxis: {
      visible: false,
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          '合計: ' + this.point.stackTotal;
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series: data.series
  };
}

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      member_status: {},
      member_working_status: {},
      partner_working_status: {},
      release_status: {},
      salesperson_status: {},
    };
  }

  componentDidMount() {
    // 年間売上
    common.fetchGet(config.api.member_dashboard)
    .then(data => this.setState(data));
  }

  render() {
    const { classes } = this.props;
    const { member_status, member_working_status, partner_working_status, release_status, salesperson_status } = this.state;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} lg={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>people</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>現在待機中人数</p>
                <h3 className={classes.cardTitle}>
                  {!common.isEmpty(member_status) ? (
                    <React.Fragment>
                      {member_status.waiting_count} / <Link to={'/member/members/'}>{member_status.member_count}</Link> <small>人</small>
                    </React.Fragment>
                  ) : null}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Icon>warning</Icon>
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {!common.isEmpty(member_status) ? (
                      <React.Fragment>
                        現在の待機率は&nbsp;{member_status.waiting_rate}&nbsp;％
                      </React.Fragment>
                    ) : null}
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} lg={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Accessibility/>
                </CardIcon>
                <p className={classes.cardCategory}>今月 / 来月 / 再来月</p>
                <h3 className={classes.cardTitle}>
                  {!common.isEmpty(release_status) ? (
                    <React.Fragment>
                      {release_status.curr_month} / {release_status.next_month} / {release_status.next_2_month} <small>人</small>
                    </React.Fragment>
                  ) : null}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Warning>
                    <Icon>warning</Icon>
                  </Warning>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    今月、来月と再来月のリリース人数
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} lg={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>ＢＰ / 個人事業主 / 社員</p>
                <h3 className={classes.cardTitle}>
                  {!common.isEmpty(member_status) ? (
                    <React.Fragment>
                      {member_status.bp_member_count} / {member_status.individual_count} / {member_status.employee_count}
                    </React.Fragment>
                  ) : null}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Icon>info</Icon>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {!common.isEmpty(member_status) ? (
                      <React.Fragment>
                        ＢＰ割合&nbsp;{member_status.bp_member_rate}&nbsp;％、
                        個人事業主割合&nbsp;{member_status.individual_rate}&nbsp;％
                      </React.Fragment>
                    ) : null}
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={getWorkingStatusOption(member_working_status)}
                  containerProps={{ style: {height: 180} }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>直近一年間の社員稼働状況</h4>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="info">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={getWorkingStatusOption(partner_working_status)}
                  containerProps={{ style: {height: 180} }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>直近一年間の協力社員稼働状況</h4>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="info">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={getSalespersonStatusOption(salesperson_status)}
                  containerProps={{ style: {height: 300} }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>各担当者が担当分のメンバー稼働状況一覧</h4>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>各担当者が担当分のメンバー稼働状況一覧</h4>
                <p className={classes.cardCategoryWhite}>
                  本日の稼働、待機状況と今月、来月、再来月のリリース人数
                </p>
              </CardHeader>
              <CardBody>
                <SimpleTable
                  tableHeaderColor="warning"
                  tableHead={list_member_dashboard_salesperson_schema}
                  tableData={salesperson_status.raw_data || []}
                  rowsPerPage={20}
                  tableProps={{size: 'small'}}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const MemberDashboard = withStyles(dashboardStyle)(Dashboard)

export { MemberDashboard };
