import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
  fake: {
    marginBottom: theme.spacing(4),
    '&:last-child': {
      marginBottom: `${theme.spacing(2)}px !important`,
    },
  },
  fakeBar: {
    backgroundColor: grey[200],
    height: theme.spacing(1),
    margin: theme.spacing(2),
    // Selects every two elements among any group of siblings.
    '&:nth-child(2n)': {
      marginRight: theme.spacing(5),
    },
  },
});

function Fake(props) {
  const { classes } = props;

  return (
    <div className={classes.fake}>
      <div className={classes.fakeBar} />
      <div className={classes.fakeBar} />
      <div className={classes.fakeBar} />
      <div className={classes.fakeBar} />
      <div className={classes.fakeBar} />
    </div>
  );
}

class Loading extends React.Component {
  
  render () {
    const { classes, stack } = this.props;

    return (
      <div>
        {Array.apply(0, Array(stack)).map((x, key) => (
          <Fake key={key} classes={classes} />
        ))}
      </div>
    );
  }
}

Loading.propTypes = {
  stack: PropTypes.number,
}

Loading.defaultProps = {
  stack: 1,
}

export default withStyles(styles)(Loading);
