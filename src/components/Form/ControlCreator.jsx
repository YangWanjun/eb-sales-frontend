import React from "react";
import { 
  withStyles,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import MyDatePicker from '../Control/DatePicker';
import ModelChoice from '../../containers/modelChoice';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
});

class ControlCreateor extends React.Component {
  render() {
    const { classes, name, column, message } = this.props;
    let { value, label } = this.props;
    const error = message ? {error: true} : {};
    const errorNode = message ? (<FormHelperText>{message}</FormHelperText>) : <React.Fragment />;

    if (column.required) {
      label = label + '（*）';
    }

    let control = null;
    if (column.visible === false) {
    } else if (column.type === 'date') {
      control = (
        <MyDatePicker
          value={value}
          label={label}
          message={message}
          onChange={this.props.handleDateChange}
        />
      );
    } else if (column.type === 'integer') {
      value = value || '';
      control = (
        <FormControl className={classes.formControl} { ...error }>
          <TextField
            { ...error }
            name={name}
            type='number'
            value={value}
            label={label}
            placeholder={this.props.placeholder}
            InputLabelProps={this.props.placeholder ? { shrink: true,} : null}
            onChange={this.props.handleChange}
          />
          { errorNode }
        </FormControl>
      );
    } else if (column.type === 'decimal') {
      value = value || '';
      control = (
        <FormControl className={classes.formControl} { ...error }>
          <TextField
            { ...error }
            name={name}
            type='number'
            value={value}
            label={label}
            placeholder={this.props.placeholder}
            InputLabelProps={this.props.placeholder ? { shrink: true,} : null}
            onChange={this.props.handleChange}
          />
          { errorNode }
        </FormControl>
      );
    } else if (column.type === 'choice') {
      value = value || '';
      control = (
        <FormControl className={classes.formControl} { ...error }>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select value={value} inputProps={{ name: name, value: value }} onChange={this.props.handleChange}>
            <MenuItem key='none' value=""><em>None</em></MenuItem>
            {column.choices.map(item => {
              return <MenuItem key={item.value} value={item.value}>{item.display_name}</MenuItem>;
            })}
          </Select>
          { errorNode }
        </FormControl>
      );
    } else if (column.type === 'field') {
      console.log(message);
      control = (
        <ModelChoice
          name={name}
          label={label}
          url={column.search_url}
          placeholder={this.props.placeholder}
          message={message}
          handleFieldChange={this.props.handleFieldChange}
        />
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
