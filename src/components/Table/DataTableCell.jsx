import React from "react";
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import {
  TableCell,
} from "@material-ui/core";
import { common } from '../../utils/common';

class DataTableCell extends React.Component {
  render() {
    const { classes, column, row, style } = this.props;
    let attrs = {};
    let value = row[column.name];
    if (column.type === 'integer' || column.type === 'decimal') {
      // 数字の場合右揃え、カンマ区切り表示
      attrs['align'] = 'right';
      value = common.toNumComma(value);
    }

    return (
      <TableCell className={classes.tableCell} key={uuid()} style={style} {...attrs}>
        {(column.url_field && row[column.url_field]) ? (
          <Link to={row[column.url_field]}>{value}</Link>
        ) : value}
      </TableCell>
    );
  }
}

export default DataTableCell;
