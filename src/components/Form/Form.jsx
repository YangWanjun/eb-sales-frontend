import React from "react";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Card from "../Card/Card";
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardFooter from '../Card/CardFooter';
import ControlCreateor from './ControlCreator';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class FormComponent extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = { 
      data: this.props.data || {},
    };
　}

  handleChange(event) {
    let value = event.target.value;
    let id = event.target.name;

    this.setState((state) => {
      let data = state.data;
      data[id] = value
      return {data: data};
    });
  }

  handleDateChange = key => date => {
    let value = date;
    let id = key;

    this.setState((state) => {
      let data = state.data;
      data[id] = value
      return {data: data};
    });
  };

  handleOk = () => {
    
  }

  render() {
    const { classes, schema, title } = this.props;
    const { data } = this.state;

    return (
      <div style={getModalStyle()} className={classes.paper}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>{title}</h4>
                {/* <p className={classes.cardCategoryWhite}>{project_detail.name}</p> */}
              </CardHeader>
              <CardBody className={classes.cardBody}>
                <Table>
                  <TableBody>
                    { Object.keys(schema).map(key => {
                      const col = schema[key];
                      if (col.read_only) {
                        return <React.Fragment key={'tableRow_' + key} />;
                      } else {
                        const fontWeight = col.required ? 'bold' : 'normal';
                        return (
                          <TableRow key={'tableRow_' + key}>
                            <TableCell key={'cellHeader_' + key} style={{fontWeight: fontWeight}}>
                              { col.label }
                            </TableCell>
                            <TableCell key={'cellValue_' + key}>
                              <ControlCreateor
                                name={key} 
                                column={col} 
                                value={data[key]}
                                handleDateChange={this.handleDateChange(key)} 
                                handleChange={this.handleChange}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      }
                    }) }
                  </TableBody>
                </Table>
              </CardBody>
              <CardFooter chart>
                <div className={classes.rightAlign}>
                  <Button onClick={this.props.handleClose} color="warning">
                    キャンセル
                  </Button>
                  <Button onClick={this.handleOk} color="primary" type="submit" autoFocus={true}>
                    確定
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

FormComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
};

export default FormComponent;
