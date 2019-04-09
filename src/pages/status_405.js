import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody.jsx";

const styles = theme => ({
  cardStyle: {
    marginTop: 0,
    marginBottom: 15,
  },
});

class Status405 extends React.Component {

  render () {
    const { statusCode, classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={ classes.cardStyle }>
              <CardBody>
                {statusCode}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Status405);
