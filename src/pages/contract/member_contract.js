import React from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import CustomBreadcrumbs from '../../components/customBreadcrumbs';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { Form } from '../../datatable';
import {
  edit_contract_schema,
  edit_contract_layout,
} from '../../layout/contract';
import { common } from '../../utils/common';
import { config } from '../../utils/config';

const styles = theme => ({
  cellHeader: {
    textAlign: 'right',
    minWidth: '70px',
    fontSize: '13px',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  cell: {
    fontSize: '13px',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(0.5),
  }
});

class _MemberContract extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = { 
      member: {},
      form_title: '契約情報',
    };
　}

  componentWillMount() {
    this._isMounted = true;
    const { params } = this.props.match;
    const url_member_detail = common.formatStr(config.api.member.detail, params.pk);
    common.fetchGet(url_member_detail).then(data => {
      document.title = `${data.full_name} | 契約情報 | ${window.appName}`;
      if (this._isMounted) {
        this.setState({
          member: data,
        });
      }
    });
    if (params.contract_id) {
      // 契約が指定された場合
      console.log(params.contract_id);
    } else {
      this.setState({form_title: '契約追加'});
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    const { member, form_title } = this.state;
    const { params } = this.props.match;

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/contract/members/" >社員一覧</Link>
          <Link to={`/contract/members/${params.pk}`} >{member.full_name}</Link>
          <Typography color="textPrimary">{form_title}</Typography>
        </CustomBreadcrumbs>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="info">
                {form_title}
              </CardHeader>
              <CardBody>
                <Form
                  schema={edit_contract_schema}
                  layout={edit_contract_layout}
                  innerRef={(form) => {this._clean = form && form.clean}}
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
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardBody>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>名前</TableCell>
                      <TableCell className={classes.cell}>{member.full_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>给料王ID</TableCell>
                      <TableCell className={classes.cell}>{member.code}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>電話番号</TableCell>
                      <TableCell className={classes.cell}>{member.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>住所</TableCell>
                      <TableCell className={classes.cell}>{member.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.cellHeader}>バージョン</TableCell>
                      <TableCell className={classes.cell}></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const MemberContract = withStyles(styles)(_MemberContract);
export { MemberContract };
