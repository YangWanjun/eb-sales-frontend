import React from "react";
import { withStyles } from '@material-ui/core';
import { TextField } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MyDatePicker from '../Control/DatePicker';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
    width: '100%',
  },
});

class ControlCreateor extends React.Component {
  render() {
    const { classes, name, column } = this.props;
    let value = this.props.value;

    let control = null;
    if (column.type === 'date') {
      control = (
        <MyDatePicker
          value={value}
          onChange={this.props.handleDateChange}
        />
      );
    } else if (column.type === 'integer') {
      control = (
        <FormControl className={classes.formControl}>
          <TextField
            name={name}
            type='number'
            value={value}
            onChange={this.props.handleChange}
          />
        </FormControl>
      );
    } else if (column.type === 'decimal') {
      control = (
        <FormControl className={classes.formControl}>
          <TextField
            name={name}
            type='number'
            value={value}
            onChange={this.props.handleChange}
          />
        </FormControl>
      );
    } else if (column.type === 'choice') {
      value = value || '';
      control = (
        <FormControl className={classes.formControl}>
          <Select value={value} inputProps={{ name: name, value: value }} onChange={this.props.handleChange}>
            <MenuItem key='none' value=""><em>None</em></MenuItem>
            {column.choices.map(item => {
              return <MenuItem key={item.value} value={item.value}>{item.display_name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      );
    }

    return (
      <React.Fragment>
        {control}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ControlCreateor);
