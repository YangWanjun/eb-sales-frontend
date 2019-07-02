import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { config } from '../../utils/config';
import { common } from '../../utils/common';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    paddingTop: 100,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 200,
    marginBottom: theme.spacing(3),
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
      rowsPerPage: config.rowsPerPage,  // PageSize
      page: 0,
      loaded: false,
      placeholder: "Loading..."
    };
    this.initialize();
  }

  initialize() {
    const { ordering, page, limit, ...otherParams } = this.props.params;
    this.handleDataRedraw(this.props.endpoint, limit, page, ordering, otherParams);

    if (this.state.summaryUrl) {
      common.fetchGet(this.state.summaryUrl).then(data => {
        this.setState({ summary: data });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params) || nextProps.endpoint !== this.props.endpoint) {
      const { ordering, page, limit, ...otherParams } = nextProps.params;
      this.handleDataRedraw(nextProps.endpoint, limit, page, ordering, otherParams);
    }
  }

  handleDataRedraw(endpoint, limit, page, order_by, filters) {
    limit = common.toInteger(limit) || config.rowsPerPage;
    page = common.toInteger(page);
    order_by = order_by || '';
    let url = common.addUrlParameter(endpoint, {
      limit: limit,
      offset: page * limit,
      ordering: order_by,
      ...filters
    });

    const orderParams = common.getOrderParams(order_by);
    common.fetchGet(url)
      .then(data => this.setState({
        url: endpoint,
        data: data,
        loaded: true,
        filters: filters,
        ...orderParams,
        page: page,
        rowsPerPage: limit,
      }));
  }

  render() {
    const { classes } = this.props;
    const { data, loaded, placeholder, filters, order, orderBy, page, rowsPerPage, summary } = this.state;
    
    if (loaded) {
        // フィルター項目はColumnsに存在しないなら除外する
        for (var key in filters) {
          if (!common.getFromJsonList(data.columns, 'name', key)) {
            delete filters[key];
          }
        }
      return this.props.render({
        data,
        filters,
        summary,
        order,
        orderBy,
        page,
        rowsPerPage,
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
  params: PropTypes.object,
};

DataProvider.defaultProps = {
  params: {},
}

export default withStyles(styles)(DataProvider);
