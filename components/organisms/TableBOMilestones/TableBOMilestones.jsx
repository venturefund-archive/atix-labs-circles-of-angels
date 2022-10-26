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
import { Button, Table, Tag } from 'antd';
import { claimMilestoneStatus } from '../../../constants/constants';
import claimMilestoneStatusMap from '../../../model/claimMilestoneStatusMap';

const TableBOMilestones = ({ data, onFundsTransferred }) => {
  const columns = [
    {
      title: 'Project',
      dataIndex: 'project.projectName',
      key: 'projectName'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Claim status',
      dataIndex: 'claimStatus',
      key: 'claimStatus',
      render: claimStatus => (
        <Tag color={claimMilestoneStatusMap[claimStatus].color}>
          {claimMilestoneStatusMap[claimStatus].name}
        </Tag>
      )
    },
    {
      key: 'actions',
      // eslint-disable-next-line react/prop-types
      render: ({ id, claimStatus }) => (
        <Button
          id={id}
          type="primary"
          size="small"
          onClick={() => onFundsTransferred(id)}
          hidden={claimStatus !== claimMilestoneStatus.CLAIMED}
        >
          <span>Mark as transferred</span>
        </Button>
      )
    }
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      size="middle"
      className="TableBOProjects"
    />
  );
};

export default TableBOMilestones;

TableBOMilestones.defaultProps = {
  data: []
};

TableBOMilestones.propTypes = {
  data: PropTypes.arrayOf({}),
  onFundsTransferred: PropTypes.func.isRequired
};
