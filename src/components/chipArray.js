import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { common } from '../utils/common';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = data => () => {
    const chipData = this.props.chipData;
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.props.onChangeFilter(chipData);
  };

  render() {
    const { classes, chipData } = this.props;

    return (
      <Paper className={classes.root}>
        {chipData.map(data => {
          let icon = null;

          if (data.value || data.value === false) {
            let label = data.value;
            if (data.choices && !common.isEmpty(data.choices)) {
              if (data.value === true) {
                label = data.name;
              } else if (data.value === false) {
                label = data.name + 'ではない';
              } else {
                label = data.choices[data.value];
              }
            }
            return (
              <Chip
                key={data.id}
                icon={icon}
                label={label}
                onDelete={this.handleDelete(data)}
                className={classes.chip}
              />
            );
          } else {
            return <React.Fragment></React.Fragment>
          }
        })}
      </Paper>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);