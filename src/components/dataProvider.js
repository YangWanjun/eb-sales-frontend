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
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleDataRedraw = this.handleDataRedraw.bind(this);
    this.state = {
      url: this.props.endpoint,
      summaryUrl: this.props.summaryUrl,
      data: [],
      summary: {},
      filters: [],
      limit: config.rowsPerPage,  // PageSize
      offset: 0,
      loaded: false,
      placeholder: "Loading..."
    };
  }

  componentDidMount() {
    this.handleDataRedraw(this.state.limit, this.state.offset)

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
    if (filters) {
      filters.map(item => {
        if (item.value) {
          return url += '&' + item.id + '=' + item.value;
        } else {
          return url;
        }
      })
    } else {
      filters = this.state.filters;
    }
    common.fetchGet(url)
      .then(data => this.setState({ data: data, loaded: true, filters: filters }));
  }

  render() {
    const { classes } = this.props;
    const { data, loaded, placeholder, filters, summary } = this.state;
    if (loaded) {
      return this.props.render(data, filters, this.handleDataRedraw, summary);
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

export default withStyles(styles)(DataProvider);
