import React from "react";
import { 
  withStyles,
  TextField,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Select,
  Checkbox,
  MenuItem,
  ListItemText,
  Chip,
} from '@material-ui/core';
import MyDatePicker from '../Control/DatePicker';
import HierarchySelect from '../Control/HierarchySelect';
import CascadeSelect from '../Control/CascadeSelect';
import ModelChoice from '../../containers/modelChoice';
import { common } from "../../utils/common";

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
    } else if (column.type === 'string') {
      value = value || '';
      control = (
        <FormControl className={classes.formControl} { ...error }>
          <TextField
            { ...error }
            name={name}
            value={value}
            label={label}
            placeholder={this.props.placeholder}
            InputLabelProps={this.props.placeholder ? { shrink: true,} : null}
            onChange={this.props.handleChange}
          />
          { errorNode }
        </FormControl>
      );
    } else if (column.type === 'text') {
      value = value || '';
      control = (
        <FormControl className={classes.formControl} { ...error }>
          <TextField
            { ...error }
            multiline
            name={name}
            value={value}
            label={label}
            rows="2"
            rowsMax="6"
            placeholder={this.props.placeholder}
            InputLabelProps={this.props.placeholder ? { shrink: true,} : null}
            onChange={this.props.handleChange}
          />
          { errorNode }
        </FormControl>
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
            inputProps={{min: column.min_value, step: column.step || 1}}
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
            inputProps={{min: column.min_value, step: column.step}}
            placeholder={this.props.placeholder}
            InputLabelProps={this.props.placeholder ? { shrink: true,} : null}
            onChange={this.props.handleChange}
          />
          { errorNode }
        </FormControl>
      );
    } else if (column.type === 'choice') {
      value = value || '';
      if (!common.isEmpty(column.choices) && column.choices[0].hasOwnProperty('parent')) {
        control = (
          <HierarchySelect
            name={name}
            label={label}
            value={value}
            error={error}
            errorNode={errorNode}
            choices={column.choices}
            handleChange={this.props.handleChange}
          />
        );
      } else {
        control = (
          <FormControl className={classes.formControl} { ...error }>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Select value={value} inputProps={{ name: name, value: value }} onChange={this.props.handleChange}>
              <MenuItem key='none' value=""><em>None</em></MenuItem>
              {column.choices ? column.choices.map(item => {
                return <MenuItem key={item.value} value={item.value}>{item.display_name}</MenuItem>;
              }) : null}
            </Select>
            { errorNode }
          </FormControl>
        );
      }
    } else if (column.type === 'choices') {
      value = value || [];
      control = (
        <FormControl className={classes.formControl} { ...error }>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select
            multiple
            value={value}
            inputProps={{ name: name, value: value }}
            onChange={this.props.handleChange}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={common.getColumnByName(column.choices, value, 'value').display_name} className={classes.chip} />
                ))}
              </div>
            )}
          >
            {column.choices.map(item => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  <Checkbox checked={value.indexOf(item.value) > -1} />
                  <ListItemText primary={item.display_name} />
                </MenuItem>
              );
            })}
          </Select>
          { errorNode }
        </FormControl>
      );
    } else if (column.type === 'cascade') {
      control = (
        <CascadeSelect
          {...this.props}
          fields={column.fields}
          choices={column.choices}
        />
      );
    } else if (column.type === 'field' || column.type === 'fields') {
      control = (
        <ModelChoice
          name={name}
          label={label}
          initial={value}
          url={column.search_url}
          placeholder={this.props.placeholder}
          message={message}
          handleFieldChange={this.props.handleFieldChange}
          selectable={column.type === 'field' ? "single" : "multiple"}
          isClientSide={column.server_side === true ? false: true}
        />
      );
    } else if (column.type === 'boolean') {
      value = value === true ? true : false;
      control = (
        <FormControl className={classes.formControl}>
          <FormControlLabel
            control={
              <Checkbox checked={value} value={name} onChange={this.props.handleCheck}/>
            }
            label={label}
          />
          { this.props.placeholder ? (
            <FormHelperText style={{marginTop: 0}}>{this.props.placeholder}</FormHelperText>
          ) : <React.Fragment />}
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
