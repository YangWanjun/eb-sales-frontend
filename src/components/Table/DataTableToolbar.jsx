import React from 'react';
import {
  Toolbar,
  Typography,
} from "@material-ui/core";

class DataTableToolbar extends React.Component {

  render() {
    const { title } = this.props;

    return (
      <Toolbar>
        <Typography variant="title">
          {title}
        </Typography>
      </Toolbar>
    );
  }
}

export default DataTableToolbar;
