/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Table, Tag, Button } from 'antd';
import './_style.scss';
import milestoneActivityStatusMap from '../../../model/milestoneActivityStatusMap';
import milestoneBudgetStatusMap from '../../../model/milestoneBudgetStatusMap';

const TableBOMilestones = ({ dataSource, onFundsTransferred }) => {
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
        const { id } = record;
        return (
          <div className="ActionButtons">
            <Button key={record.id} onClick={() => onFundsTransferred(id)}>
              Funds has transferred
            </Button>
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
