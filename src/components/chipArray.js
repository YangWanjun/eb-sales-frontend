import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

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

          if (data.label === 'React') {
            icon = <TagFacesIcon />;
          }

          if (data.value) {
            return (
              <Chip
                key={data.id}
                icon={icon}
                label={data.value}
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