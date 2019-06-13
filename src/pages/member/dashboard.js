import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from "../../components/Grid/GridItem";
import { common } from '../../utils/common';
import { config } from '../../utils/config';

function getWorkingStatusOption(data) {
  return {
    chart: {
      type: 'column'
    },
    title: {
      text: '直近一年間の社員稼働状況'
    },
    xAxis: {
      categories: data.categories
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
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
    series: [{
      name: 'John',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Jane',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Joe',
      data: [3, 4, 4, 2, 5]
    }]
  };
}

class MemberDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      brief_status: {},
      working_status: {},
    };
  }

  componentDidMount() {
    // 年間売上
    common.fetchGet(config.api.member_dashboard)
    .then(data => this.setState(data));
  }

  render() {
    const { working_status } = this.state;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <HighchartsReact
              highcharts={Highcharts}
              options={getWorkingStatusOption(working_status)}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export { MemberDashboard };
