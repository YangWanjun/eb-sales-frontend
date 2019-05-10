import React from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@material-ui/core';
import GridContainer from './Grid/GridContainer';
import GridItem from './Grid/GridItem';
import Card from "./Card/Card";
import CardBody from "./Card/CardBody.jsx";
import CardFooter from "./Card/CardFooter.jsx";
import BadgeLabel from '../components/badgeLabel';
import FormDialog from './Form/index'
import { common } from '../utils/common';

const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cellHeader: {
    textAlign: 'right',
    width: '25%',
    minWidth: 100,
  },
  cardStyle: {
    marginTop: 0,
    marginBottom: 15,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class DetailPanel extends React.Component {

  constructor(props) {
    super(props);

    this.onShowEditDialog = this.onShowEditDialog.bind(this);
  }

  onShowEditDialog = () => {
    if (this.showModel) {
      const { formComponentProps } = this.props;
      let data = Object.assign({}, this.props.data);
      formComponentProps.schema.map(col => {
        if (col.type === 'field' && col.display_field) {
          data[col.name] = [{value: data[col.name], display_name: data[col.display_field]}]
        }
        return true;
      });
      this.showModel(data);
    }
  }

  render() {
    const { classes, title, data, schema, formComponentProps } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className={ classes.cardStyle }>
            <CardBody>
              <h3>{ title }</h3>
              <Table>
                <TableBody>
                  { schema.map(col => {
                    const value = data[col.name];
                    let display_name = value;
                    let badgeColor = null;
                    if (!common.isEmpty(data) && value != null && col.type === 'choice' && col.choices) {
                      display_name = common.getColumnByName(col.choices, value, 'value').display_name;
                    } else if (!common.isEmpty(data) && col.type === 'boolean') {
                      display_name = value === true ? 'はい' : 'いいえ';
                    }
                    if (col.styles && col.styles[value]) {
                      badgeColor = col.styles[value].backgroundColor;
                    }
                    return (
                      <TableRow key={col.name}>
                        <TableCell className={classes.cellHeader}>{col.label}</TableCell>
                        { badgeColor === null ? (
                          <TableCell>{ display_name }</TableCell>
                        ) : (
                          <TableCell><BadgeLabel color={badgeColor} badgeContent={ display_name } /></TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardBody>
            <CardFooter chart>
              <Typography style={{flex: 1}} />
              <Button variant="contained" color="secondary" className={classes.button}>
                &nbsp;&nbsp;&nbsp;削除&nbsp;&nbsp;&nbsp;
              </Button>
              <Button variant="contained" color="primary" className={classes.button} onClick={this.onShowEditDialog}>
                &nbsp;&nbsp;&nbsp;変更&nbsp;&nbsp;&nbsp;
              </Button>
              { formComponentProps ? (
                <FormDialog
                  innerRef={(dialog) => { this.showModel = dialog && dialog.handleOpen }}
                  {...formComponentProps}
                />
              ) : <React.Fragment /> }
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
};

DetailPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  schema: PropTypes.array.isRequired,
};

export default withStyles(styles)(DetailPanel);
