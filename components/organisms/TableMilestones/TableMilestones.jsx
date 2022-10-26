/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Select, Divider, Modal, Icon, Form, Input, Button } from 'antd';
import { isNaN } from 'lodash';
import { withUser } from '../../utils/UserContext';
import EditableCell from '../../molecules/EditableCell/EditableCell';

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
      },
      createActivityButton: false
    };
    if (!props.user) return;

    this.actualField = { data: {} };
    this.columns = [];
  }

  isEditing = index => {
    const { editingKey } = this.state;
    return index === editingKey;
  };

  edit = (key, record) => {
    this.actualField.data = { ...record };
    this.setState({ editingKey: key });
  };

  cancelEdit = () => {
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
      },
      createActivityButton: true
    });
  };

  hideModal = () => {
    this.setState({ visible: false, createActivityButton: false });
  };

  createNewActivity = async () => {
    const { activity, currentMilestone } = this.state;
    const { onCreateActivity } = this.props;
    this.setState({ createActivityButton: false });
    const created = await onCreateActivity(
      activity,
      currentMilestone,
      this.hideModal
    );
    if (!created) {
      this.setState({ createActivityButton: true });
    }
    return created;
  };

  render() {
    const { visible, activity, createActivityButton } = this.state;

    const {
      onAssignOracle,
      oracles,
      dataSource,
      isSocialEntrepreneur,
      onDelete,
      onEdit
    } = this.props;

    this.columns = [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        fixed: 'left'
      },
      {
        title: 'Timeline',
        dataIndex: 'quarter',
        key: 'quarter',
        editable: true
      },
      {
        title: 'Assigned Oracle',
        key: 'oracle',
        render: (text, record) => {
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
              onChange={selected => {
                const user = JSON.parse(selected);
                onAssignOracle(user ? user.id : undefined, record.id);
                // eslint-disable-next-line no-param-reassign
                record.oracle = user;
              }}
              defaultValue={oracleToShow}
            >
              <Select.Option value={null}>None</Select.Option>
              {oracles.map(aOracle => (
                <Select.Option key={aOracle.id} value={JSON.stringify(aOracle)}>
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

    const forSocialEntrepreneur = {
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
                <Button
                  type="link"
                  onClick={() => {
                    onEdit(index, this.actualField);
                    this.setState({ editingKey: '' });
                  }}
                >
                  Save
                </Button>
                <Divider type="vertical" />
                <Button type="link" onClick={() => this.cancelEdit(index)}>
                  Cancel
                </Button>
              </span>
            ) : (
              <span className="flex">
                <Button
                  type="link"
                  disabled={editingKey !== ''}
                  onClick={() => this.edit(index, record)}
                >
                  Edit
                </Button>
                <Divider type="vertical" />
                <Button
                  type="link"
                  disabled={editingKey !== ''}
                  onClick={() => onDelete(record)}
                >
                  Delete
                </Button>
                {record.type === 'Milestone' && (
                  <span>
                    <Divider type="vertical" />
                    <Button
                      type="link"
                      onClick={() => this.showActivityModal(record.id)}
                      title="Create a new Activity"
                    >
                      +
                    </Button>
                  </span>
                )}
              </span>
            )}
          </div>
        );
      }
    };
    if (isSocialEntrepreneur) {
      this.columns.push(forSocialEntrepreneur);
    }

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
        okButtonProps={{ disabled: !createActivityButton }}
        onCancel={() => this.setState({ visible: false })}
        okText="Create"
        cancelText="Cancel"
        width="75%"
        maskClosable={false}
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
                    if (
                      (!isNaN(value) && /^-?[0-9]*?$/.test(value)) ||
                      value === ''
                    ) {
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

    const columns = this.columns
      ? this.columns.map(col => {
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
        })
      : [];

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

TableMilestones.propTypes = {
  user: PropTypes.element.isRequired,
  onCreateActivity: PropTypes.func.isRequired,
  onAssignOracle: PropTypes.func.isRequired,
  oracles: PropTypes.element.isRequired,
  dataSource: PropTypes.element.isRequired,
  isSocialEntrepreneur: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};
