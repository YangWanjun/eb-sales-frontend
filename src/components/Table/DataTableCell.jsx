import React from "react";
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import {
  TableCell,
} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { common } from '../../utils/common';

class DataTableCell extends React.Component {

  getOutput(value) {
    const { column, row } = this.props;
    return (
      (column.url_field && row[column.url_field]) ? (
        <Link to={row[column.url_field]}>{value}</Link>
      ) : value
    );
  }

  render() {
    const { classes, column, row, style } = this.props;
    let attrs = {};
    let value = row[column.name];
    let output = null;
    if (column.type === 'integer' || column.type === 'decimal') {
      // 数字の場合右揃え、カンマ区切り表示
      attrs['align'] = 'right';
      value = common.toNumComma(value);
      output = this.getOutput(value);
    } else if (column.type === 'boolean') {
      attrs['align'] = 'center';
      if (value === true || value === 1) {
        output = <CheckCircleIcon style={{color: 'green'}} />;
      } else if (value === false || value === 0) {
        output = <HighlightOffIcon style={{color: 'red'}} />;
      }
    } else {
      output = this.getOutput(value);
    }

    return (
      <TableCell className={classes.tableCell} key={uuid()} style={style} {...attrs}>
        {output}
      </TableCell>
    );
  }
}

export default DataTableCell;
