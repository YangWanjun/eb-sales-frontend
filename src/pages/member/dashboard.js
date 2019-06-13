import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody";
import { common } from '../../utils/common';
import { config } from '../../utils/config';

import dashboardStyle from "../../assets/jss/views/dashboardStyle.jsx";

function getWorkingStatusOption(data) {
  return {
    chart: {
      type: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
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

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      brief_status: {},
      member_working_status: {},
      partner_working_status: {},
    };
  }

  componentDidMount() {
    // 年間売上
    common.fetchGet(config.api.member_dashboard)
    .then(data => this.setState(data));
  }

  render() {
    const { classes } = this.props;
    const { member_working_status, partner_working_status } = this.state;

    return (
      <div>
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
      </div>
    );
  }
}

const MemberDashboard = withStyles(dashboardStyle)(Dashboard)

export { MemberDashboard };
