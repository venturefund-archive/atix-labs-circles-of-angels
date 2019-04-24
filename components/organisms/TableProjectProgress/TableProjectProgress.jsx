import React from 'react';
import { Table, Tag, Badge, Icon, Progress } from 'antd';
import MilestoneActivityStatusMap from '../../../model/milestoneActivityStatusMap';
import Routing from '../../utils/Routes';
import './_style.scss';

const TableProjectProgress = ({
  dataSource,
  projectId,
  projectName,
  filters
}) => {
  const columns = [
    {
      title: 'Quarter',
      width: 100,
      dataIndex: 'quarter',
      key: 'quarter',
      fixed: 'left'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    { title: 'Tasks', dataIndex: 'tasks', key: '1' },
    { title: 'Social Impact Targets', dataIndex: 'targets', key: '2' },
    { title: 'Review Criterion', dataIndex: 'impactCriterion', key: '3' },
    { title: 'Expenditure Category', dataIndex: 'category', key: '5' },
    { title: 'Key Personnel Responsible', dataIndex: 'keyPersonnel', key: '6' },
    { title: 'Budget needed', dataIndex: 'budget', key: '7' },

    {
      title: 'Oracle',
      dataIndex: 'oracle',
      key: 'oracle',
      fixed: 'right',
      filters: filters.oracles,
      onFilter: (value, record) =>
        record.oracle &&
        record.oracle.username &&
        record.oracle.username.indexOf(value) === 0,
      render: oracle =>
        oracle ? <span key={oracle.id}>{oracle.username}</span> : ''
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      fixed: 'right',
      render: rawStatus => {
        const status = MilestoneActivityStatusMap[rawStatus];
        return status ? (
          <span key={status.name}>
            <Tag color={status.color}>{status.name.toUpperCase()}</Tag>
          </span>
        ) : (
          ''
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (text, record) =>
        record.type !== 'Milestone' && (
          <span key={record.id}>
            <a
              onClick={() => {
                Routing.toProjectEvidence({
                  activityId: record.id,
                  projectId
                });
              }}
            >
              Evidence
            </a>
          </span>
        )
    }
  ];

  return (
    <Table
      title={() => (
        <div className="space-between">
          Milestones
          <div className="milestoneStatus">
            <Progress percent={100} size="small" /> Milestone Complete!
          </div>
        </div>
      )}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 1300 }}
      filters={filters}
    />
  );
};
export default TableProjectProgress;
