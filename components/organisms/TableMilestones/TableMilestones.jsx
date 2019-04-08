import React from 'react';
import { Table, Select } from 'antd';
import { withUser } from '../../utils/UserContext';
import Roles from '../../../constants/RolesMap';
import EditableCell from '../../molecules/EditableCell/EditableCell';

import './_style.scss';

class TableMilestones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: ''
    };
    if (!props.user) return;

    this.actualField = { data: {} };
    this.columns = [];
  }

  componentDidMount() {
    this.columns = [
      {
        title: 'Timeline',
        dataIndex: 'quarter',
        key: 'quarter',
        editable: true
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: 'Tasks',
        dataIndex: 'tasks',
        key: 'tasks',
        editable: true
      },
      {
        title: 'Expected Changes/ Social Impact Targets',
        dataIndex: 'impact',
        key: 'targets',
        editable: true
      },
      {
        title: 'Review Criterion',
        dataIndex: 'impactCriterion',
        key: 'ReviewOne',
        editable: true
      },
      {
        title: 'Signs of Success',
        key: 'success',
        dataIndex: 'signsOfSuccess',
        editable: true
      },
      {
        title: 'Review Criterion ',
        key: 'ReviewTwo',
        dataIndex: 'signsOfSuccessCriterion',
        editable: true
      },
      {
        title: 'Expenditure Category',
        key: 'expenditureCategory',
        dataIndex: 'category',
        editable: true
      },
      {
        title: 'Key Personnel Responsible',
        key: 'keyPersonnel',
        dataIndex: 'keyPersonnel',
        editable: true
      },
      {
        title: 'Budget needed',
        key: 'budget',
        dataIndex: 'budget',
        editable: true
      },
      {
        title: 'Oracle',
        key: 'oracle',
        fixed: 'right',
        render: (text, record, index) => {
          const { user, onAssignOracle, oracles } = this.props;
          if (
            !user ||
            !user.role ||
            user.role.id !== Roles.SocialEntrepreneur ||
            !record.type.includes('Activity')
          )
            return '';
          return (
            <Select
              key={index}
              style={{ width: 200 }}
              showSearch
              placeholder="Assign a Oracle"
              optionFilterProp="children"
              onChange={userId => onAssignOracle(userId, record.id)}
              defaultValue={record.oracle ? record.oracle.id : undefined}
            >
              <Select.Option value={null}>None</Select.Option>
              {oracles.map(oracle => (
                <Select.Option key={oracle.id} value={oracle.id}>
                  {oracle.username}
                </Select.Option>
              ))}
            </Select>
          );
        }
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        fixed: 'right',
        render: (text, record, index) => {
          const { user, onEdit, onDelete } = this.props;
          if (!user || !user.role || user.role.id !== Roles.SocialEntrepreneur)
            return '';
          const { editingKey } = this.state;
          const editable = this.isEditing(index);
          return (
            <div>
              {editable ? (
                <span>
                  <a onClick={() => onEdit(record, this.actualField)}>Save</a>
                  <a onClick={() => this.cancelEdit(index)}>Cancel</a>
                </span>
              ) : (
                <span>
                  <a
                    disabled={editingKey !== ''}
                    onClick={() => this.edit(index, record)}
                  >
                    Edit
                  </a>
                  <a
                    disabled={editingKey !== ''}
                    onClick={() => onDelete(record)}
                  >
                    Delete
                  </a>
                </span>
              )}
            </div>
          );
        }
      }
    ];
  }

  isEditing = index => {
    const { editingKey } = this.state;
    return index === editingKey;
  };

  edit = (key, record) => {
    this.actualField.data = { ...record };
    this.setState({ editingKey: key });
  };

  cancelEdit = key => {
    this.setState({ editingKey: '' });
  };

  render() {
    const { dataSource } = this.props;
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record, index) => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          colkey: col.key,
          editing: this.isEditing(index),
          fieldtoedit: this.actualField
        })
      };
    });

    return (
      <Table
        components={components}
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: true }}
        className="TableMilestones"
      />
    );
  }
}

export default withUser(TableMilestones);
