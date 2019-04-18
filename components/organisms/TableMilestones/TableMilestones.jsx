import React from 'react';
import { Table, Select, Divider, Modal, Icon, Form, Input } from 'antd';
import { withUser } from '../../utils/UserContext';
import EditableCell from '../../molecules/EditableCell/EditableCell';

import './_style.scss';

const { TextArea } = Input;

class TableMilestones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: '',
      visible: false,
      currentMilestone: 0,
      activity: {
        tasks: '',
        impact: '',
        impactCriterion: '',
        signsOfSuccess: '',
        signsOfSuccessCriterion: '',
        category: '',
        keyPersonnel: '',
        budget: ''
      }
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
                  {record.type === 'Milestone' && (
                    <span>
                      <Divider type="vertical" />
                      <a
                        onClick={() => this.showActivityModal(record.id)}
                        title="Create a new Activity"
                      >
                        +
                      </a>
                    </span>
                  )}
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

  showActivityModal = milestoneId => {
    this.setState({
      visible: true,
      currentMilestone: milestoneId,
      activity: {
        tasks: '',
        impact: '',
        impactCriterion: '',
        signsOfSuccess: '',
        signsOfSuccessCriterion: '',
        category: '',
        keyPersonnel: '',
        budget: ''
      }
    });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  createNewActivity = async () => {
    const { activity, currentMilestone } = this.state;
    const { onCreateActivity } = this.props;
    onCreateActivity(activity, currentMilestone, this.hideModal);
  };

  render() {
    const { dataSource } = this.props;
    const { visible, activity } = this.state;
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const createActivityModal = (
      <Modal
        title="Create new Activity"
        visible={visible}
        onOk={this.createNewActivity}
        onCancel={() => this.setState({ visible: false })}
        okText="Create"
        cancelText="Cancel"
        width="75%"
      >
        <Form onChange={this.handleSubmit}>
          <div className="WebFormProject">
            <div className="form-section">
              <Form.Item className="TextAreaFullWidth">
                <TextArea
                  placeholder="Tasks"
                  value={activity.tasks}
                  onChange={e => {
                    const tasks = e.target.value;
                    const toChange = { ...activity, tasks };
                    this.setState({ activity: toChange });
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-section">
              <Form.Item className="TextArea">
                <TextArea
                  placeholder="Expected Changes/ Social Impact Targets"
                  value={activity.impact}
                  onChange={e => {
                    const impact = e.target.value;
                    const toChange = { ...activity, impact };
                    this.setState({ activity: toChange });
                  }}
                />
              </Form.Item>
              <Form.Item className="TextArea">
                <TextArea
                  placeholder="Review Criterion"
                  value={activity.impactCriterion}
                  onChange={e => {
                    const impactCriterion = e.target.value;
                    const toChange = { ...activity, impactCriterion };
                    this.setState({ activity: toChange });
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-section">
              <Form.Item className="TextArea">
                <TextArea
                  placeholder="Signs of Success"
                  value={activity.signsOfSuccess}
                  onChange={e => {
                    const signsOfSuccess = e.target.value;
                    const toChange = { ...activity, signsOfSuccess };
                    this.setState({ activity: toChange });
                  }}
                />
              </Form.Item>
              <Form.Item className="TextArea">
                <TextArea
                  placeholder="Review Criterion"
                  value={activity.signsOfSuccessCriterion}
                  onChange={e => {
                    const signsOfSuccessCriterion = e.target.value;
                    const toChange = { ...activity, signsOfSuccessCriterion };
                    this.setState({ activity: toChange });
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-section">
              <Form.Item className="TextArea">
                <TextArea
                  placeholder="Expenditure Category"
                  value={activity.category}
                  onChange={e => {
                    const category = e.target.value;
                    const toChange = { ...activity, category };
                    this.setState({ activity: toChange });
                  }}
                />
              </Form.Item>
              <Form.Item className="TextArea">
                <TextArea
                  placeholder="Key Personnel Responsible"
                  value={activity.keyPersonnel}
                  onChange={e => {
                    const keyPersonnel = e.target.value;
                    const toChange = { ...activity, keyPersonnel };
                    this.setState({ activity: toChange });
                  }}
                />
              </Form.Item>
              <Form.Item className="TextArea">
                <Input
                  placeholder="Budget Needed"
                  min={0}
                  prefix={
                    <Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  value={activity.budget}
                  onChange={e => {
                    const { value } = e.target;
                    let budget = '';
                    const valid = /^[0-9]*(\.[0-9]*)?$/.test(value);
                    if (valid) {
                      budget = value;
                      const toChange = { ...activity, budget };
                      this.setState({ activity: toChange });
                    }
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    );

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
      <div>
        <Table
          title={() => 'Milestones'}
          components={components}
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 1300 }}
          className="TableMilestones"
          defaultSortOrder="ascend"
        />
        {visible && createActivityModal}
      </div>
    );
  }
}

export default withUser(TableMilestones);
