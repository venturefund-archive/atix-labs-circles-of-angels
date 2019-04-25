import React from 'react';
import { Table, Tag, Select } from 'antd';
import './_style.scss';
import milestoneActivityStatusMap from '../../../model/milestoneActivityStatusMap';
import milestoneBudgetStatusMap from '../../../model/milestoneBudgetStatusMap';

const TableBOMilestones = ({
  dataSource,
  budgetStatusOptions,
  onBudgetStatusChange
}) => {
  const columns = [
    {
      title: 'Project',
      dataIndex: 'project.projectName',
      key: 'projectName'
    },
    {
      title: 'Quarter',
      dataIndex: 'quarter',
      key: 'quarter'
    },
    {
      title: 'Tasks',
      dataIndex: 'tasks',
      key: 'tasks'
    },
    {
      title: 'Milestone Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <span>
          <Tag
            color={milestoneActivityStatusMap[status.status].color}
            key={status.status}
          >
            {milestoneActivityStatusMap[status.status].name}
          </Tag>
        </span>
      )
    },
    {
      title: 'Budget Transfer Status',
      dataIndex: 'budgetStatus',
      key: 'budgetStatus',
      render: status => (
        <span>
          <Tag
            color={milestoneBudgetStatusMap[status.id].color}
            key={status.id}
          >
            {milestoneBudgetStatusMap[status.id].name}
          </Tag>
        </span>
      )
    },
    {
      title: 'Change Transfer Status',
      dataIndex: 'id',
      key: 'changeStatus',
      render: (text, record, index) => {
        const { budgetStatus, id } = record;
        return (
          <div className="ActionButtons">
            <Select
              key={record.id}
              style={{ width: 100 }}
              showSearch
              placeholder="Budget Transfer Status"
              optionFilterProp="children"
              onChange={selected => {
                const status = JSON.parse(selected);
                if (status.id !== budgetStatus.id) {
                  onBudgetStatusChange(id, status.id, index);
                }
              }}
              defaultValue={budgetStatus.name}
            >
              {budgetStatusOptions.map(status => (
                <Select.Option key={status.id} value={JSON.stringify(status)}>
                  {status.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        );
      }
    }
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      size="middle"
      className="TableBOProjects"
    />
  );
};

export default TableBOMilestones;
