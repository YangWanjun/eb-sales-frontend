import React from 'react';
import {
  withStyles,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core';
import { common } from '../../utils/common';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  parentItem: {
    fontWeight: 'bold',
  }
});

class HierarchySelect extends React.Component {

  getAllItems() {
    const { choices } = this.props;
    const rootItems = common.isEmpty(choices) ? [] : choices.filter(item => item.parent === null);
    let items = [];
    rootItems.map(item => {
      return this.getChildItems(items, item);
    });
    return items;
  }

  getChildItems(items, item, deep=0) {
    const children = this.props.choices.filter(sub => sub.parent === item.value);
    let itemProps = {key: item.value + '_item', value: item.value};
    let display_name = item.display_name;
    if (children && children.length > 0) {
      itemProps['className'] = this.props.classes.parentItem;
      display_name = '▼' + display_name;
    }

    items.push(<MenuItem disabled={item.disabled === true} {...itemProps} style={{marginLeft: deep * 30}}>{display_name}</MenuItem>)
    children.map(sub => {
      return this.getChildItems(items, sub, deep + 1);
    });
  }

  render() {
    const { classes, name, value, label, error, errorNode } = this.props;
    const items = this.getAllItems();

    return (
      <FormControl className={classes.formControl} {...error}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select value={value} inputProps={{ name: name, value: value }} onChange={this.props.handleChange}>
            <MenuItem key='none' value=""><em>None</em></MenuItem>
            {items.map(item => {
              return item;
            })}
          </Select>
          { errorNode }
      </FormControl>
    );
  }
}

export default withStyles(styles)(HierarchySelect);
