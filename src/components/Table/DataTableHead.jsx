import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

class DataTableHead extends React.Component {
  render() {
    const { classes, tableHeaderColor, tableHead, colsWidth } = this.props;

    if (tableHead === undefined) {
      return null;
    } else {
      return (
        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
          <TableRow>
            {tableHead.map((column, key) => {
              let width = 'inherit';
              if (column.visible !== false && colsWidth && colsWidth.length >= key) {
                width = colsWidth[key];
                key += 1;
              }
              return (
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}
                  key={key}
                  style={{width}}
                  align={(column.type === 'integer' || column.type === 'decimal') ? 'right': 'left'}
                >
                  {column.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
      );
    }
  }
}

export default DataTableHead;
