import React from 'react';
import { Table } from 'antd';

import './_style.scss';

const TableMilestones = ({ dataSource, onDelete }) => {
  console.log(dataSource);
  const columns = [
    {
      title: 'Timeline',
      dataIndex: 'quarter',
      key: 'timeline'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Tasks',
      dataIndex: 'tasks',
      key: 'tasks'
    },
    {
      title: 'Expected Changes/ Social Impact Targets',
      dataIndex: 'impact',
      key: 'targets'
    },
    {
      title: 'Review Criterion',
      dataIndex: 'impactCriterion',
      key: 'ReviewOne'
    },
    {
      title: 'Signs of Success',
      key: 'success',
      dataIndex: 'signsOfSuccess'
    },
    {
      title: 'Review Criterion ',
      key: 'ReviewTwo',
      dataIndex: 'signsOfSuccessCriterion'
    },
    {
      title: 'Expenditure Category',
      key: 'expenditureCategory',
      dataIndex: 'category'
    },
    {
      title: 'Key Personnel Responsible',
      key: 'keyPersonnel',
      dataIndex: 'keyPersonnel'
    },
    {
      title: 'Budget needed',
      key: 'budget',
      dataIndex: 'budget'
    },
    {
      title: 'Action',
      key: 'action',
      render: record => <a onClick={() => onDelete(record)}>Delete</a>
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      size="middle"
      className="TableMilestones"
    />
  );
};

export default TableMilestones;
