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
    this.handleOk = this.handleOk.bind(this);
    this.state = { 
      data: this.initializeData(props),
      errors: props.errors || {},
    };
　}

  initializeData(props) {
    if (props.schema) {
      let data = props.data || {};
      props.schema.map(col => {
        if (common.isEmpty(data[col.name]) && col.default) {
          data[col.name] = col.default;
        }
        return true;
      });
      return data;
    } else {
      return {};
    }
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

    this.props.onChanges.map(method => {
      let data = this.state.data;
      data[name] = checked;
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

  handleOk = () => {
    const formData = this.clean();
    if (formData) {
      const __index__ = formData.__index__;
      if (formData.id && this.props.edit_url) {
        // 更新
        const url = common.formatStr(this.props.edit_url, formData.id);
        common.fetchPut(url, formData).then(json => {
          json['__index__'] = __index__;
          this.props.showSuccessMsg(constant.SUCCESS.SAVED);
          this.props.handleClose();
          if (this.props.onRowUpdated) {
            this.props.onRowUpdated(json);
          }
        }).catch(errors => {
          this.setState({errors});
          this.toastError(errors);
        });
      } else if (!formData.id && this.props.add_url) {
        // 追加
        common.fetchPost(this.props.add_url, formData).then(json => {
          json['__index__'] = __index__;
          this.props.showSuccessMsg(constant.SUCCESS.SAVED);
          this.props.handleClose();
          if (this.props.onRowAdded) {
            this.props.onRowAdded(json);
          }
        }).catch(errors => {
          this.setState({errors});
          this.toastError(errors);
        });
      } else {
        this.props.showWarningMsg(constant.WARNING.REQUIRE_SAVE_URL);
      }
    }
  };

  getFormLayout(data, schema, layout) {
    let control = null;
    if (common.isEmpty(layout)) {
      control = (
        <GridContainer>
          {schema.map((col, key) => (
            this.createFormField(col, key, 12, data)
          ))}
        </GridContainer>
      );
    } else {
      control = (
        <GridContainer>
          {layout.map((row, key) => (
            this.getRowLayout(row, key, data)
          ))}
        </GridContainer>
      );
    }
    return control;
  }

  getRowLayout(row, key, data) {
    const { schema } = this.props;
    if (typeof row === 'string') {
      const col = common.getColumnByName(schema, row, 'name');
      return col ? this.createFormField(col, row, 12, data) : null;
    } else if (Array.isArray(row)) {
      const colSpan = Math.floor(12 / row.length);
      return (
        <React.Fragment key={key}>
          {row.map((fieldName, key) => {
            const col = common.getColumnByName(schema, fieldName, 'name');
            return col ? this.createFormField(col, key, colSpan, data) : null;
          })}
        </React.Fragment>
      );
    }
    return null;
  }

  createFormField(col, key, colSpan, data) {
    const { classes } = this.props;
    const { errors } = this.state;
    if (col.read_only === true) {
      return (
        <GridItem key={key} xs={12} sm={12} md={colSpan}>
          <FormControl className={classes.formControl}>
            <TextField
              disabled
              value={data[col.name]}
              label={col.label}
              InputLabelProps={{
                shrink: true,
              }}
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
          wrapper={{element: GridItem, props: {xs: 12, sm: 12, md: colSpan}}}
          errors={errors}
        />
      );
    } else {
      const message = errors[col.name] || null;
      return (
        <GridItem key={key} xs={12} sm={12} md={colSpan}>
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
