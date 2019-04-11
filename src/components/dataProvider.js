import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    paddingTop: 100,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 200,
  },
});

class DataProvider extends Component {

  constructor(props) {
    super(props);
    this.handleDataRedraw = this.handleDataRedraw.bind(this);
    this.state = {
      url: this.props.endpoint,
      summaryUrl: this.props.summaryUrl,
      data: {},
      summary: {},
      filters: {},
      order: 'asc',  // asc or desc
      orderBy: 'id',  // field name
      limit: config.rowsPerPage,  // PageSize
      offset: 0,
      loaded: false,
      placeholder: "Loading..."
    };
    this.initialize();
  }

  initialize() {
    const { ordering, ...otherParams } = this.props.params;
    this.handleDataRedraw(this.state.limit, this.state.offset, ordering, otherParams);

    if (this.state.summaryUrl) {
      common.fetchGet(this.state.summaryUrl).then(data => {
        this.setState({ summary: data });
      });
    }
  }

  handleDataRedraw(limit, page, order_by, filters) {
    let url = this.props.endpoint;
    if (url.indexOf('?') > 0) {
      url += '&';
    } else {
      url += '?';
    }
    url += "limit=" + limit + "&offset=" + page * limit + (order_by ? ('&ordering=' + order_by) : '');
    if (!common.isEmpty(filters)) {
      Object.keys(filters).map(key => {
        if (filters[key]) {
          return url += '&' + key + '=' + filters[key];
        } else {
          return url;
        }
      });
    } else {
      filters = this.state.filters;
    }
    let order = 'asc';
    let orderBy = '';
    if (order_by) {
      if (order_by.substr(0, 1) === '-') {
        order = 'desc';
        orderBy = order_by.substr(1);
      } else {
        order = 'asc';
        orderBy = order_by;
      }
    }
    common.fetchGet(url)
      .then(data => this.setState({
        data: data,
        loaded: true,
        filters: filters,
        order: order,
        orderBy: orderBy,
      }));
  }

  render() {
    const { classes } = this.props;
    const { data, loaded, placeholder, filters, order, orderBy, summary } = this.state;
    console.log('data provider render:' + order + ',' + orderBy);
    
    if (loaded) {
        // フィルター項目はColumnsに存在しないなら除外する
        for (var key in filters) {
          if (!common.getColumnByName(data.columns, key, 'name')) {
            delete filters[key];
          }
        }
      return this.props.render({
        data,
        filters,
        summary,
        order,
        orderBy,
        onDataRedraw: this.handleDataRedraw,
      });
    } else {
      return (
        <Paper className={classes.paper}>
          <CircularProgress />
          <Typography component="p">
            {placeholder}
          </Typography>
        </Paper>
      );
    }
  }
}

DataProvider.propTypes = {
  endpoint: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataProvider);
