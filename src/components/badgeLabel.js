import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  content: {
    color: '#fff',
    backgroundColor: '#2196f3',
    top: 0,
    right: 0,
    height: '20px',
    display: 'flex',
    padding: '0 4px',
    zIndex: 1,
    position: 'absolute',
    flexWrap: 'wrap',
    fontSize: '0.75rem',
    minWidth: 50,
    transform: 'scale(1) translate(50%, -50%)',
    boxSizing: 'border-box',
    transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    alignItems: 'center',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    alignContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    transformOrigin: '100% 0%',
  },
});

class BadgeLabel extends React.Component {
  
  render () {
    const { badgeContent, classes, color } = this.props;

    return (
      <span color={color} className={classes.root}>
        <span className={classes.content}>{ badgeContent }</span>
      </span>
    )
  }
}

export default withStyles(styles)(BadgeLabel);
