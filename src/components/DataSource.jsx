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
    padding: theme.spacing(2),
    paddingTop: 100,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 200,
    marginBottom: theme.spacing(3),
  },
});

class DataSource extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loaded: false,
      placeholder: "Loading..."
    };
    this.initialize(props);
  }

  initialize(props) {
    if (props.endpoint) {
      common.fetchGet(props.endpoint).then(data => {
        this.setState({
          data,
          loaded: true,
        });
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { data, loaded, placeholder } = this.state;
    
    if (loaded) {
      return this.props.render({data});
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

DataSource.propTypes = {
  endpoint: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  params: PropTypes.object,
};

DataSource.defaultProps = {
  params: {},
}

export default withStyles(styles)(DataSource);
