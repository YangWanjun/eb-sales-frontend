import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import { config } from '../utils/config';
import { common } from '../utils/common';

import dashboardStyle from "../assets/jss/views/dashboardStyle.jsx";

var Chartist = require("chartist");

var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

class TurnoverDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      turnoverYearlyChart: {
        data: {
          labels: null,
          series: [],
        },
        options: {
          axisY: {
            labelInterpolationFnc: function (value) {
              return common.toNumComma(value / 1000000) + 'M';
            },
          },
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          // low: 0,
          // high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 10
          }
        },
        // for animation
        animation: {
          draw: function(data) {
            if (data.type === "line" || data.type === "area") {
              data.element.animate({
                d: {
                  begin: 600,
                  dur: 700,
                  from: data.path
                    .clone()
                    .scale(1, 0)
                    .translate(0, data.chartRect.height())
                    .stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              });
            } else if (data.type === "point") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: "ease"
                }
              });
            }
          }
        }
      },
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
              return common.toNumComma(value / 1000000) + 'M';
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
      },
      turnoverDivisionMonthlyChart: {
        data: {
          labels: null,
          series: [],
        },
        options: {
          axisY: {
            labelInterpolationFnc: function (value) {
              return common.toNumComma(value / 1000000) + 'M';
            },
          },
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        animation: {
          draw: function(data) {
            if (data.type === "line" || data.type === "area") {
              data.element.animate({
                d: {
                  begin: 600,
                  dur: 700,
                  from: data.path
                    .clone()
                    .scale(1, 0)
                    .translate(0, data.chartRect.height())
                    .stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              });
            } else if (data.type === "point") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: "ease"
                }
              });
            }
          }
        },
      },
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    // 年間売上
    fetch(config.api.turnover_yearly_chart)
    .then(response => {
      if (response.status !== 200) {
          return this.setState({ turnoverYearlyChart: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => this.setState({ 
      turnoverYearlyChart: data 
    }));
    // 月別売上
    fetch(config.api.turnover_monthly_chart)
    .then(response => {
      if (response.status !== 200) {
          return this.setState({ turnoverMonthlyChart: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => this.setState({ 
      turnoverMonthlyChart: data 
    }));
    // 部署別、月別売上
    fetch(config.api.turnover_division_monthly_chart)
    .then(response => {
      if (response.status !== 200) {
          return this.setState({ turnoverDivisionMonthlyChart: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => this.setState({ 
      turnoverDivisionMonthlyChart: data 
    }));
  }
  
  render() {
    const { classes } = this.props;
    const { turnoverYearlyChart, turnoverMonthlyChart, turnoverDivisionMonthlyChart } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={turnoverYearlyChart.data}
                  type="Line"
                  options={turnoverYearlyChart.options}
                  listener={turnoverYearlyChart.animation}
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
                <h4 className={classes.cardTitle}>
                  <Link to="/turnover/monthly">月別売上一覧</Link>
                </h4>
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
                  data={turnoverDivisionMonthlyChart.data}
                  type="Line"
                  options={turnoverDivisionMonthlyChart.options}
                  listener={turnoverDivisionMonthlyChart.animation}
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
