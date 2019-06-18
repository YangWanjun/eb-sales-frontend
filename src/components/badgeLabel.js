import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

import { common } from '../utils/common';

const styles = theme => ({
  root: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing3,
  },
  content: {
    color: theme.palette.textColor,
    backgroundColor: theme.palette.color,
    top: 0,
    right: 0,
    height: '20px',
    display: 'flex',
    padding: '0 4px',
    zIndex: 1,
    position: 'absolute',
    flexWrap: 'wrap',
    fontSize: '11px',
    minWidth: 60,
    transform: 'scale(1) translate(50%, -50%)',
    boxSizing: 'border-box',
    transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    alignItems: 'center',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    alignContent: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    transformOrigin: '100% 0%',
  },

  colorGrey: {
    backgroundColor: '#9e9e9e',
    color: 'white',
  },

  colorGreen: {
    backgroundColor: '#4caf50',
    color: 'white',
  },

  colorBlue: {
    backgroundColor: '#2196f3',
    color: 'white',
  },

  colorPurple: {
    backgroundColor: '#9c27b0',
    color: 'white',
  },

  colorLime: {
    backgroundColor: '#cddc39',
    color: 'black',
  },
});

class BadgeLabel extends React.Component {
  
  render () {
    const { badgeContent, classes, color } = this.props;

    return (
      <span className={classes.root}>
        <span className={[classes.content, classes['color' + common.capitalize(color)]].join(' ')}>
          { badgeContent }
        </span>
      </span>
    )
  }
}

export default withStyles(styles)(BadgeLabel);
