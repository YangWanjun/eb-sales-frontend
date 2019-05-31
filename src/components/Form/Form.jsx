import React from "react";
import PropTypes from 'prop-types';
import {
  FormControl,
  TextField,
} from '@material-ui/core';
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import ControlCreateor from './ControlCreator';
import { common } from "../../utils/common";
import { constant } from "../../utils/constants";

class FormComponent extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.validate = this.validate.bind(this);
    this.clean = this.clean.bind(this);
    this.toastError = this.toastError.bind(this);
    this.state = { 
      data: this.props.data || {},
      errors: {},
    };
　}

  handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState((state) => {
      let data = state.data;
      data[name] = value;
      return {data: data};
    });

    this.props.onChanges.map(method => {
      let data = this.state.data;
      data[name] = value;
      const retVal = method(name, data);
      if (retVal) {
        this.setState((state) => {
          let data = Object.assign({}, state.data, retVal);
          return {data: data};
        });
      }
      return true;
    });
  }

  handleDateChange = key => date => {
    let value = common.formatDate(date, 'YYYY-MM-DD');
    let name = key;

    this.setState((state) => {
      let data = state.data;
      data[name] = value
      return {data: data};
    });
  };

  handleFieldChange = (name, value) => {
    this.setState((state) => {
      let data = state.data;
      data[name] = value
      return {data: data};
    });
  };

  handleCheck(event) {
    let name = event.target.value;
    const checked = event.target.checked;
    
    this.setState((state) => {
      let data = state.data;
      data[name] = checked;
      return {data: data};
    });
  }

  validate() {
    let hasError = false;
    let errors = {};
    const { data } = this.state;
    // 必須項目チェック
    this.props.schema.map(col => {
      const value = data[col.name];
      if (col.required === true) {
        if (value === null || value === '' || value === undefined || (typeof value === 'object' && common.isEmpty(value))) {
          hasError = true;
          errors[col.name] = common.formatStr(constant.ERROR.REQUIRE_FIELD, col.label);
        }
      }
      return true;
    });
    // カスタマイズのチェック
    this.props.checker.map(method => {
      const retVal = method(data);
      if (retVal !== true) {
        hasError = true;
        retVal.map(item => (
          errors[item.name] = item.message
        ));
      }
      return true;
    });

    this.setState({errors});
    if (hasError === true) {
      this.toastError(errors);
      return false;
    } else {
      return true;
    }
  }

  toastError(errors) {
    let errMsg = constant.ERROR.FORM_CHECK_ERROR;
    if (errors) {
      if (errors.non_field_errors) {
        if (Array.isArray(errors.non_field_errors) && errors.non_field_errors.length > 0) {
          errMsg = errors.non_field_errors[0];
        } else {
          errMsg = errors.non_field_errors;
        }
      } else if (errors.detail) {
        errMsg = errors.detail;
      }
    }
    this.props.showErrorMsg(errMsg);
  }

  clean() {
    if (this.validate() === true) {
      let data = Object.assign({}, this.state.data);
      this.props.schema.map(col => {
        if (col.type === 'field') {
          const value = data[col.name];
          if (Array.isArray(value) && value.length > 0) {
            const item = value[0];
            data[col.name] = item.value;
          }
        } else if (col.type === 'fields') {
          const value = data[col.name];
          if (Array.isArray(value) && value.length > 0) {
            let items = [];
            value.map(item => (items.push(item.value)))
            data[col.name] = items;
          }
        }
        return true;
      });
      return data;
    } else {
      return null;
    }
  }

  getFormLayout(data, schema, layout) {
    let control = null;
    const { classes } = this.props;
    const { errors } = this.state;
    if (common.isEmpty(layout)) {
      control = (
        <GridContainer>
          {schema.map((col, key) => {
            if (col.read_only === true) {
              return (
                <GridItem key={key} xs={12} sm={12} md={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      disabled
                      value={data[col.name]}
                      label={col.label}
                    />
                  </FormControl>
                </GridItem>  
              );
            } else if (col.type === 'cascade') {
              return (
                <ControlCreateor
                  key={key}
                  column={col}
                  data={data}
                  handleChange={this.handleChange}
                  wrapper={{element: GridItem, props: {xs: 12, sm: 12, md: 12}}}
                  errors={errors}
                />
              );
            } else {
              const message = errors[col.name] || null;
              return (
                <GridItem key={key} xs={12} sm={12} md={12}>
                  <ControlCreateor
                    name={col.name} 
                    column={col} 
                    value={data[col.name]}
                    data={data}
                    label={col.label}
                    placeholder={col.help_text}
                    message={message}
                    handleDateChange={this.handleDateChange(col.name)} 
                    handleChange={this.handleChange}
                    handleFieldChange={this.handleFieldChange}
                    handleCheck={this.handleCheck}
                  />
                </GridItem>
              );
            }
          })}
        </GridContainer>
      );
    } else {
      control = (
        <GridContainer>
          {}
        </GridContainer>
      );
    }
    return control;
  }

  getRowLayout(data, columns) {
    const colSpan = Math.floor(12 / columns.length);
    return (
      <React.Fragment>
        {columns.map(col => (
          <GridItem key={'item_' + col.name} xs={12} sm={12} md={colSpan}>
            <ControlCreateor
              name={col.name}
              column={col} 
              value={data[col.name]}
              label={col.label}
              handleDateChange={this.handleDateChange(col.name)}
              handleChange={this.handleChange}
            />
          </GridItem>
        ))}
      </React.Fragment>
    )
  }

  render() {
    const { schema, layout } = this.props;
    const { data } = this.state;
    return this.getFormLayout(data, schema, layout);
  }
}

FormComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  schema: PropTypes.array.isRequired,
  checker: PropTypes.array,
  onChanges: PropTypes.array,
};

FormComponent.defaultProps = {
  checker: [],
  onChanges: [],
};

export default FormComponent;
