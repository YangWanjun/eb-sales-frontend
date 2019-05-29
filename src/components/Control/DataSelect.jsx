import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem,
  Select,
} from '@material-ui/core';
import { common } from '../../utils/common';

class DataSelect extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: props.value,
      choices: props.choices,
    };
    this.initChoices();
  }

  initChoices() {
    const { dataSource } = this.props;
    if (dataSource) {
      common.fetchGet(dataSource).then(data => (
        this.setState({choices: data})
      ));
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const { name, error } = this.props;
    const { value, choices } = this.state;

    return (
        <Select value={value} inputProps={{ name: name, value: value }} onChange={this.handleChange} error={error}>
          <MenuItem key='none' value=""><em>None</em></MenuItem>
          {choices ? choices.map(item => {
            return <MenuItem key={item.value} value={item.value}>{item.display_name}</MenuItem>;
          }) : null}
        </Select>
    );
  }
}

DataSelect.propTypes = {
  name: PropTypes.string,
  choices: PropTypes.array,
  dataSource: PropTypes.string,
};

DataSelect.defaultProps = {
  choices: [],
}

export default DataSelect;
