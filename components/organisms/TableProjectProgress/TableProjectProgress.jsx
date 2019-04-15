import React from 'react';
import { Table, Tag } from 'antd';
import MilestoneActivityStatusMap from '../../../model/milestoneActivityStatusMap';
import Routing from '../../utils/Routes';
import './_style.scss';

const TableProjectProgress = ({ dataSource, projectId, projectName }) => {
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
      render: (text, record) => {
        return (
          record.type !== 'Milestone' && (
            <span key={record.id}>
              <a
                onClick={() => {
                  Routing.toProjectEvidence({
                    activityId: record.id,
                    projectId,
                    projectName
                  });
                }}
              >
                Evidence
              </a>
            </span>
          )
        );
      }
    }
  ];

  return (
    <Table
      title={() => 'Milestones'}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 1300 }}
    />
  );
};
export default TableProjectProgress;
