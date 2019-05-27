import React from 'react';
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText,
} from '@material-ui/core';
import { common } from '../../utils/common';

class CascadeSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedData: this.initSelectedData(),
    }
  }

  initSelectedData() {
    const { choices, fields, data } = this.props;
    let retVal = {};
    fields.map(field => {
      const value = data[field.name] || null;
      if (value) {
        retVal[field.name] = common.getColumnByName(choices, value, 'value');
      }
      return true;
    });
    return retVal;
  }

  getChildItems(parent, currentValue) {
    let children = this.props.choices.filter(sub => sub.parent === parent);
    if (currentValue && children.filter(sub => sub.value === currentValue).length === 0) {
      children = children.concat(this.props.choices.filter(sub => sub.value === currentValue));
    }
    return children;
  }

  getParentId(field) {
    if (!field.parent) {
      return null;
    }
    const { selectedData } = this.state;
    if (selectedData[field.parent]) {
      return selectedData[field.parent].value;
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let { selectedData } = this.state;
    selectedData[name] = common.getColumnByName(this.props.choices, value, 'value');
    const childFields = this.getChildFields(name);
    childFields.map(name => (selectedData[name] = null));
    this.setState({selectedData});

    if (this.props.handleChange) {
      this.props.handleChange(event);
    }
  };

  getChildFields(fieldName) {
    const childFields = this.props.fields.filter(f => f.parent === fieldName);
    let children = [];
    childFields.map(f1 => {
      children.push(f1.name);
      children = children.concat(this.getChildFields(f1.name));
      return true;
    });
    return children;
  }

  render() {
    const { classes, fields, data, wrapper, errors } = this.props;

    return (
      <React.Fragment>
        { fields.map((field, key) => {
          const value = data[field.name] || '';
          const choices = this.getChildItems(this.getParentId(field), value);
          const hasError = (errors && errors[field.name]) ? {error: true} : {};
          const errorNode = (errors && errors[field.name]) ? (<FormHelperText>{errors[field.name]}</FormHelperText>) : null;
          const control = (
            <FormControl key={key} className={classes.formControl} {...hasError}>
              <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
              <Select value={value} inputProps={{ name: field.name, value: value }} onChange={this.handleChange}>
                <MenuItem key='none' value=""><em>None</em></MenuItem>
                {choices ? choices.map(item => {
                  return <MenuItem disabled={item.disabled === true} key={item.value} value={item.value}>{item.display_name}</MenuItem>;
                }) : null}
              </Select>
              {errorNode}
            </FormControl>
          );
          if (wrapper) {
            return React.createElement(wrapper.element, {
              ...wrapper.props,
              key: key,
              children: control,
            });
          } else {
            return control;
          }
        })}
      </React.Fragment>
    );
  }
}

export default CascadeSelect;
