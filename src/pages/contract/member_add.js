import React from 'react';
import { Link } from 'react-router-dom'
import {
  Typography,
  Button,
} from '@material-ui/core';
import CustomBreadcrumbs from '../../components/customBreadcrumbs';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import {
  edit_member_schema,
  edit_member_layout,
} from '../../layout/contract_member';
import { Form } from '../../datatable';
import { common } from '../../utils/common';
import { constant } from '../../utils/constants';
import { config } from '../../utils/config';

class MemberAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
    }
  }

  save = () => {
    if (this._clean) {
      const data = this._clean();
      if (data) {
        let response = null;
        if (data.id) {
          response = common.fetchPut(common.formatStr(config.api.member.detail, data.id), data);
        } else {
          response = common.fetchPost(config.api.member.list, data);
        }
        response.then(json => {
          common.showSuccess(constant.SUCCESS.SAVED);
        }).catch(errors => {
          this.setState({errors});
          common.showError(constant.ERROR.FORM_CHECK_ERROR);
        })
      } else {
        common.showError(constant.ERROR.FORM_CHECK_ERROR);
      }
    }
  };

  render() {
    const { errors } = this.state;
    console.log(errors);

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/contract/members/">社員一覧</Link>
          <Typography color="textPrimary">追加</Typography>
        </CustomBreadcrumbs>
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <Card>
              <CardHeader color="info">
                社員追加
              </CardHeader>
              <CardBody>
                <Form
                  schema={edit_member_schema}
                  layout={edit_member_layout}
                  innerRef={(form) => {this._clean = form && form.clean}}
                  errors={errors}
                />
              </CardBody>
              <CardFooter chart>
                <Typography style={{flex: 1}} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.save}
                >
                  &nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export {MemberAdd};
