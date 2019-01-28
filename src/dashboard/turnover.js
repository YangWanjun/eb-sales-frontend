import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import ChartistGraph from 'react-chartist';
import GridContainer from '../components/Grid/GridContainer'
import GridItem from "../components/Grid/GridItem";
import Card from "../components/Card/Card";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import { api } from '../utils/config';

import {
    dailySalesChart,
    completedTasksChart
} from "../variables/charts.jsx";

import dashboardStyle from "../assets/jss/views/dashboardStyle.jsx";

var delays2 = 80,
  durations2 = 500;

class TurnoverDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      turnoverMonthlyChart: {
        data: {
          labels: null,
          series: [],
        },
        options: {
          axisX: {
            showGrid: false
          },
          axisY: {
            labelInterpolationFnc: function (value) {
              return value / 1000000 + 'M';
            },
          },
          // low: 0,
          // high: 100000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ],
        animation: {
          draw: function(data) {
            if (data.type === "bar") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays2,
                  dur: durations2,
                  from: 0,
                  to: 1,
                  easing: "ease"
                }
              });
            }
          }
        },
      }
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    fetch(api.turnover_monthly_chart)
    .then(response => {
      if (response.status !== 200) {
          return this.setState({ turnoverMonthlyChart: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => this.setState({ 
      turnoverMonthlyChart: data 
    }));;
  }
  
  render() {
    const { classes } = this.props;
    const { turnoverMonthlyChart } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>年間売上一覧</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={turnoverMonthlyChart.data}
                  type="Bar"
                  options={turnoverMonthlyChart.options}
                  responsiveOptions={turnoverMonthlyChart.responsiveOptions}
                  listener={turnoverMonthlyChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>月別売上一覧</h4>
                <p className={classes.cardCategory}>
                  過去１２か月間の売上情報
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

TurnoverDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(TurnoverDashboard);
