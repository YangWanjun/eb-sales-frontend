import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Button,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = () => ({
  cardStyle: {
    marginTop: 0,
    marginBottom: 15,
  },
});

class ProjectRequestDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      project_detail: {},
      request_html: '',
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_project_detail = common.formatStr(config.api.project_detail, params.project_id) + '?schema=1';
    common.fetchGet(url_project_detail).then(data => {
      this.setState({
        project_detail: data,
      });
    });

    common.fetchGet(common.formatStr(config.api.project_request_html, params.request_no)).then(data => {
      this.setState({
        request_html: data.html,
      });
    });
  }

  printProjectRequest = () => {
    var frm = document.getElementById('printProjectRequest').contentWindow;
    frm.focus();
    frm.print();
    return false;
  };

  render() {
    const { classes } = this.props;
    const { params } = this.props.match;
    const { project_detail, request_html } = this.state;

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/project" >案件一覧</Link>
          <Link to={common.formatStr("/project/%s", project_detail.id)} >{ project_detail.name }</Link>
          <Link to={common.formatStr("/project/%s/request", project_detail.id)} >注文・請求一覧</Link>
          <Typography color="textPrimary">{params.request_no}</Typography>
        </CustomBreadcrumbs>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={ classes.cardStyle }>
              <CardBody>
                <iframe
                  title='請求詳細'
                  id='printProjectRequest'
                  srcDoc={request_html}
                  frameBorder='0'
                  width='100%'
                  height='1250px'
                >
                </iframe>
              </CardBody>
              <CardFooter chart>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.printProjectRequest}
                >
                  &nbsp;&nbsp;&nbsp;印刷&nbsp;&nbsp;&nbsp;
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ProjectRequestDetail);
