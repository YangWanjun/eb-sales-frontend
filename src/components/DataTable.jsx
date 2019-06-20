import React, { Component } from "react";
import { EnhancedTable } from 'mui-enhanced-datatable';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FormDialog from '../containers/FormDialog';
import ConfirmDialog from './ConfirmDialog';
import { common } from '../utils/common';
import { constant } from '../utils/constants';

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.onShowAddDialog = this.onShowAddDialog.bind(this);
    this.state = {
      tableData: props.tableData,
      selectedData: null,
    };
  }

  onShowAddDialog = () => {
    if (this.showAddModel) {
      this.showAddModel();
    }
  };

  handleDataAdded = (data) => {
    if (data.__index__ !== null && data.__index__ !== undefined) {
      let { tableData } = this.state;
      let existedRow = common.getColumnByName(tableData, data.__index__, '__index__');
      Object.assign(existedRow, data);
      this.setState({tableData});
    } else {
      this.setState(state => {
        let tableData = state.tableData;
        tableData.push(data);
        return {tableData};
      });
    }
  }

  onShowEditDialog = (data) => {
    if (this.showEditModel) {
      this.showEditModel(data);
    }
  };

  handleDataEdited = (data) => {
    if (data.__index__ !== null && data.__index__ !== undefined) {
      let { tableData } = this.state;
      let existedRow = common.getColumnByName(tableData, data.__index__, '__index__');
      Object.assign(existedRow, data);
      this.setState({tableData});
    }
  };

  onShowDeleteDialog = (data) => {
    if (this.showConfirm) {
      const content = common.formatStr(this.props.deleteOption.verbose_name, data);
      this.showConfirm(content);
      this.setState({selectedData: data});
    }
  };

  handleDataDeleted = (delete_url) => {
    const { tableData } = this.state;
    let { selectedData } = this.state;
    if (common.isJSON(selectedData)) {
      const pk = selectedData.id;
      common.fetchDelete(common.formatStr(delete_url, pk)).then(() => {
        const newTableData = tableData.filter(row => pk !== row.id);
        this.setState({tableData: newTableData, selectedData: null});
        this.props.showSuccessMsg(constant.SUCCESS.DELETED);
        if (this._hideConfirm) {
          this._hideConfirm();
        }
        if (this._clearSelected) {
          this._clearSelected();
        }
      }).catch(() => {
        this.props.showErrorMsg(constant.ERROR.DELETED_FAILURE);
      });
    }
  };

  render() {
    let { tableActions, rowActions, addOption, editOption, deleteOption, ...otherProps } = this.props;
    const { tableData } = this.state;
    let addProps = null;
    let editProps = null;
    otherProps['tableData'] = tableData;
    tableActions = tableActions || [];
    rowActions = rowActions || [];
    if (addOption) {
      const { tooltip, callback, ...otherAddProps } = addOption;
      tableActions.push({
        'tooltip': tooltip,
        'icon': <AddIcon />,
        'handleClick': this.onShowAddDialog,
      });
      addProps = Object.assign({}, otherAddProps);
    }
    if (editOption) {
      const { tooltip, callback, ...otherEditProps } = editOption;
      rowActions.push({
        'tooltip': editOption.tooltip,
        'icon': <EditIcon />,
        'handleClick': this.onShowEditDialog,
      });
      editProps = otherEditProps;
    }
    if (deleteOption) {
      rowActions.push({
        'tooltip': deleteOption.tooltip,
        'icon': <DeleteIcon />,
        'handleClick': this.onShowDeleteDialog,
      });
    }

    return (
      <div>
        <EnhancedTable
          {...otherProps}
          pushpinTop={common.getFixedHeaderHeight()}
          tableActions={tableActions}
          rowActions={rowActions}
          innerRef={(dialog) => { 
            this._clearSelected = dialog && dialog.clearSelected 
          }}
        />
        {addOption ? (
          <FormDialog
            innerRef={(dialog) => { 
              this.showAddModel = dialog && dialog.handleOpen 
            }}
            {...addProps}
            onDataPosted={this.handleDataAdded}
          />
        ) : null}
        {editOption ? (
          <FormDialog
            innerRef={(dialog) => { 
              this.showEditModel = dialog && dialog.handleOpen 
            }}
            {...editProps}
            onDataPutted={this.handleDataEdited}
          />
        ) : null}
        {deleteOption ? (
          <ConfirmDialog
            innerRef={(dialog) => { 
              this.showConfirm = dialog && dialog.handleOpen; 
              this._hideConfirm = dialog && dialog.handleCancel;
            }}
            title={deleteOption.tooltip || 'データを削除します、よろしいですか？'}
            onOk={() => this.handleDataDeleted(deleteOption.delete_url)}
          />
        ) : null}
      </div>
    );
  };
}

export default DataTable;
