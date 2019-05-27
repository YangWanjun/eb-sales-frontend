import 'date-fns';
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import jaLocale from 'date-fns/locale/ja';
import withStyles from "@material-ui/core/styles/withStyles";
import {
  FormControl,
  FormHelperText,
} from '@material-ui/core';

const styles = theme => ({
  formControl: {
    width: '100%',
    margin: theme.spacing.unit,
  },
});

class MyDatePicker extends React.Component {
  render() {
    const { classes, label, message, onChange } = this.props;
    const error = message ? {error: true} : {};
    const errorNode = message ? (<FormHelperText>{message}</FormHelperText>) : <React.Fragment />;
    const value = this.props.value || null;

    return (
      <FormControl className={classes.formControl} {...error}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
          <DatePicker
            margin="normal"
            label={label}
            value={value}
            onChange={onChange}
            format='yyyy/MM/dd'
            maxDate={'9999/12/31'}
            {...error}
          />
        </MuiPickersUtilsProvider>
        { errorNode }
      </FormControl>
    );
  }
}

export default withStyles(styles)(MyDatePicker);
