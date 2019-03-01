import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import { config } from '../utils/config';
import { common } from '../utils/common';


class ProjectDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { project_detail: {} };
　}

  componentDidMount() {
    const { params } = this.props.match;
    const url_project_detail = common.formatStr(config.api.project_detail, params.project_id);
    fetch(url_project_detail).then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    }).then(data => {
      this.setState({ project_detail: data, });
    });
  }

  render () {
    const { project_detail } = this.state;

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/project" >案件一覧</Link>
          <Typography color="textPrimary">{ project_detail.name }</Typography>
        </CustomBreadcrumbs>
        <Card chart>
          <CardBody>
            <h3>{ project_detail.name }</h3>
            <p>
              Last Campaign Performance
            </p>
          </CardBody>
          <CardFooter chart>
          　<div>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default ProjectDetail;
