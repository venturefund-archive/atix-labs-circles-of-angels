import React from 'react';
import { Table, Select, Divider } from 'antd';
import { withUser } from '../../utils/UserContext';
import EditableCell from '../../molecules/EditableCell/EditableCell';

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
    const {
      onAssignOracle,
      oracles,
      onDelete,
      onEdit,
      isSocialEntrepreneur
    } = this.props;

    this.columns = [
      {
        title: 'Timeline',
        dataIndex: 'quarter',
        key: 'quarter',
        editable: true,
        fixed: 'left'
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: 'Assigned Oracle',
        key: 'oracle',
        render: (text, record, index) => {
          if (!record.type.includes('Activity')) return '';
          const { oracle } = record;
          const oracleToShow = oracle ? oracle.username : undefined;
          const editable = (
            <Select
              key={record.id}
              style={{ width: 100 }}
              showSearch
              placeholder="Select Oracle"
              optionFilterProp="children"
              onChange={user => {
                onAssignOracle(user ? user.id : undefined, record.id);
                record.oracle = user;
              }}
              defaultValue={oracleToShow}
            >
              <Select.Option value={null}>None</Select.Option>
              {oracles.map(aOracle => (
                <Select.Option key={aOracle.id} value={aOracle}>
                  {aOracle.username}
                </Select.Option>
              ))}
            </Select>
          );
          if (isSocialEntrepreneur) return editable;
          return oracleToShow;
        }
      },
      {
        title: 'Tasks',
        dataIndex: 'tasks',
        key: 'tasks',
        editable: true
      },
      {
        title: '/ Social Impact Targets',
        dataIndex: 'impact',
        key: 'impact',
        editable: true,
        width: 200
      },
      {
        title: 'Review Criterion',
        dataIndex: 'impactCriterion',
        key: 'impactCriterion',
        editable: true
      },
      {
        title: 'Signs of Success',
        key: 'signsOfSuccess',
        dataIndex: 'signsOfSuccess',
        editable: true
      },
      {
        title: 'Review Criterion ',
        key: 'signsOfSuccessCriterion',
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
        editable: true,
        sorter: (a, b) => a.id - b.id
      }
    ];
    const forSocialEntrepreneur = [
      {
        title: 'Action',
        dataIndex: 'operation',
        fixed: 'right',
        render: (text, record, index) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(index);
          return (
            <div>
              {editable ? (
                <span className="flex">
                  <a
                    onClick={() => {
                      onEdit(index, this.actualField);
                      this.setState({ editingKey: '' });
                    }}
                  >
                    Save
                  </a>
                  <Divider type="vertical" />
                  <a onClick={() => this.cancelEdit(index)}>Cancel</a>
                </span>
              ) : (
                <span className="flex">
                  <a
                    disabled={editingKey !== ''}
                    onClick={() => this.edit(index, record)}
                  >
                    Edit
                  </a>
                  <Divider type="vertical" />
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
    if (isSocialEntrepreneur)
      this.columns = this.columns.concat(forSocialEntrepreneur);
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
        title={() => 'Milestones'}
        components={components}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1300 }}
        className="TableMilestones"
        defaultSortOrder="ascend"
      />
    );
  }
}

export default withUser(TableMilestones);
