import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  paper: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
});

function CustomBreadcrumbs(props) {
  const { classes, children } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Breadcrumbs separator="›" arial-label="Breadcrumb">
          { children }
        </Breadcrumbs>
      </Paper>
    </div>
  );
}

CustomBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomBreadcrumbs);