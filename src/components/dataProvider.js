import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
      data: [],
      filters: [],
      limit: 25,  // PageSize
      offset: 0,
      loaded: false,
      placeholder: "Loading..."
    };
  }

  componentDidMount() {
    this.handleDataRedraw(this.state.limit, this.state.offset)
  }

  handleDataRedraw(limit, page, order_by, filters) {
    let url = this.props.endpoint + "?limit=" + limit + "&offset=" + page * limit + (order_by ? ('&ordering=' + order_by) : '');
    if (filters) {
      filters.map(item => {
        if (item.value) {
          return url += '&' + item.id + '__icontains=' + item.value;
        } else {
          return url;
        }
      })
    } else {
      filters = this.state.filters;
    }
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => this.setState({ data: data, loaded: true, filters: filters }));
  }

  render() {
    const { classes } = this.props;
    const { data, loaded, placeholder, filters } = this.state;
    if (loaded) {
      return this.props.render(data, filters, this.handleDataRedraw);
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
