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
    this.handleChangePage = this.handleChangePage.bind(this);
    this.state = {
      url: this.props.endpoint,
      data: [],
      limit: 25,  // PageSize
      offset: 0,
      loaded: false,
      placeholder: "Loading..."
    };
  }

  componentDidMount() {
    this.handleChangePage(this.state.limit, this.state.offset)
  }

  handleChangePage(limit, page) {
    const url = this.props.endpoint + "?limit=" + limit + "&offset=" + page * limit;
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => this.setState({ data: data, loaded: true }));
  }

  render() {
    const { classes } = this.props;
    const { data, loaded, placeholder } = this.state;
    if (loaded) {
      return this.props.render(data, this.handleChangePage);
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
