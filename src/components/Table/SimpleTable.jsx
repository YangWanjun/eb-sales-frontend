import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
// core components
import tableStyle from "../../assets/jss/components/tableStyle.jsx";

class SimpleTable extends React.Component {

  render () {
    const { classes, tableHeaderColor, tableHead, tableData } = this.props;

    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((col, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      {col.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.map((row, key) => {
              return (
                <TableRow key={key}>
                  {tableHead.map((col, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {(col.url_field && row[col.url_field]) ? (
                          <Link to={row[col.url_field]}>{row[col.name]}</Link>
                        ) : row[col.name]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

SimpleTable.defaultProps = {
  tableHeaderColor: "gray"
};

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(tableStyle)(SimpleTable);
