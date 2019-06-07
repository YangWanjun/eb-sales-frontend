import React from 'react';
import FormDialog from '../../containers/FormDialog';
import {
  send_mail_schema,
} from '../../layout/mail';
import { config } from '../../utils/config';

export default class MailForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(initial) {
    if (this._handleOpen) {
      this._handleOpen(initial);
    }
  }

  render() {
    let { ...props } = this.props;

    return (
      <FormDialog
        innerRef={(dialog) => { this._handleOpen = dialog && dialog.handleOpen }}
        schema={send_mail_schema}
        {...props}
        add_url={config.api.mail_send}
      />
    );
  }
};
