import 'date-fns';
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import jaLocale from 'date-fns/locale/ja';
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from '@material-ui/core/FormControl';

const styles = {
  formControl: {
    width: '100%',
  },
}

class MyDatePicker extends React.Component {
  render() {
    const { classes, label, value, onChange } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
          <DatePicker
            margin="normal"
            label={label}
            value={value}
            onChange={onChange}
            format='yyyy/MM/dd'
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    );
  }
}

export default withStyles(styles)(MyDatePicker);
