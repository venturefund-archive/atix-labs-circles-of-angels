/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import { claimMilestoneStatus } from '../../../constants/constants';
import claimMilestoneStatusMap from '../../../model/claimMilestoneStatusMap';
import './_style.scss';

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
      render: ({ id, claimStatus }) => (
        <CustomButton
          className="blueLink"
          onClick={() => onFundsTransferred(id)}
          buttonText="Mark as transferred"
          hidden={claimStatus !== claimMilestoneStatus.CLAIMED}
        />
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
