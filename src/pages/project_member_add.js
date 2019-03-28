import React from "react";
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import Card from "../components/Card/Card";
import GridItem from "../components/Grid/GridItem.jsx";
import GridContainer from "../components/Grid/GridContainer.jsx";
import CardHeader from "../components/Card/CardHeader.jsx";
import CardBody from "../components/Card/CardBody.jsx";
import MyDatePicker from '../components/Control/DatePicker';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = {
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
  formControl: {
    width: '100%',
  },
};

class ProjectMemberAdd extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = { 
      project_detail: {},
      project_member: {},
      columns: [],
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_project_detail = common.formatStr(config.api.project_detail, params.project_id) + '?schema=1';
    common.fetchGet(url_project_detail).then(data => {
      this.setState({ 
        project_detail: data,
        columns: data.columns,
      });
    });
  }

  handleChange(event) {
    let value = event.target.value;
    let id = event.target.name;

    this.setState((state) => {
      let project_member = state.project_member;
      project_member[id] = value
      return {project_member: project_member};
    });
  }

  handleDateChange = key => date => {
    let value = date;
    let id = key;

    this.setState((state) => {
      let project_member = state.project_member;
      project_member[id] = value
      return {project_member: project_member};
    });
  };

  render() {
    const { classes } = this.props;
    const { project_detail, project_member } = this.state;
    const { project_id } = this.props.match.params;

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/project" >案件一覧</Link>
          <Link to={"/project/" + project_id} >{ project_detail.name }</Link>
          <Typography color="textPrimary">アサインメンバー</Typography>
        </CustomBreadcrumbs>
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>{project_detail.name}にメンバーをアサインする</h4>
                {/* <p className={classes.cardCategoryWhite}>{project_detail.name}</p> */}
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <MyDatePicker
                      label='開始日'
                      value={project_member.start_date}
                      onChange={this.handleDateChange('start_date')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <MyDatePicker
                      label='終了日'
                      value={project_member.start_date}
                      onChange={this.handleDateChange('end_date')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        name='price'
                        label='単価'
                        value={project_member.price || 0}
                        type='number'
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        name='min_hours'
                        label='基準時間'
                        value={project_member.min_hours || project_detail.min_hours || 160}
                        type='number'
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        name='max_hours'
                        label='最大時間'
                        value={project_member.max_hours || project_detail.max_hours || 200}
                        type='number'
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        name='plus_per_hour'
                        label='増（円）'
                        value={project_member.plus_per_hour || 0}
                        type='number'
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        name='minus_per_hour'
                        label='減（円）'
                        value={project_member.minus_per_hour || 0}
                        type='number'
                        onChange={this.handleChange}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

}

export default withStyles(styles)(ProjectMemberAdd);
