import React, { Component } from "react";
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loaded: false,
      placeholder: "Loading..."
    };
  }

  componentWillMount() {
    this._isMounted = true;
    if (this.props.endpoint) {
      common.fetchGet(this.props.endpoint)
        .then(data => {
          if (this._isMounted) {
            this.setState({
              data,
              loaded: true,
            })
          }
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    const { data, loaded, placeholder } = this.state;
    
    if (loaded) {
      return this.props.render(data);
    } else {
      return (
        <div className={classes.paper}>
          <CircularProgress />
          <Typography component="p">
            {placeholder}
          </Typography>
        </div>
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
