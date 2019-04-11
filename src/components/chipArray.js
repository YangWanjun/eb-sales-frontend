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

  handleDelete = key => () => {
    const chipData = this.props.chipData;
    delete chipData[key];
    this.props.onChangeFilter(chipData);
  };

  render() {
    const { classes, chipData, columns } = this.props;

    return (
      <Paper className={classes.root}>
        {Object.keys(chipData).map(key => {
          let icon = null;
          const value = chipData[key];
          const col = common.getColumnByName(columns, key, 'name');
          if (!col) {
            return (<React.Fragment/>);
          } else if (value || value === false) {
            let label = value;
            if (col.choices && !common.isEmpty(col.choices)) {
              if (value === true) {
              } else if (value === false) {
                label = col.label + 'ではない';
              } else {
                let item = common.getColumnByName(col.choices, value, 'value');
                if (item) {
                  label = item.display_name;
                }
              }
            }
            return (
              <Chip
                key={key}
                icon={icon}
                label={label}
                onDelete={this.handleDelete(key)}
                className={classes.chip}
              />
            );
          } else {
            return (<React.Fragment/>);
          }
        })}
      </Paper>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
  chipData: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);