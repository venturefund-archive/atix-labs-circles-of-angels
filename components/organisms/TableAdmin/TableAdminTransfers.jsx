/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Table, Tag } from 'antd';
import transferStatusesMap from '../../../model/transferStatusesMap';

const TableAdminTransfers = ({ projectId, getTransfers }) => {
  const [transfers, setTransfers] = useState([]);

  const columns = [
    {
      title: 'Transfer Id',
      dataIndex: 'transferId',
      key: 'transferId'
    },
    {
      title: 'Sender',
      key: 'sender',
      render: ({ sender }) => (
        <span>{`${sender.firstName} ${sender.lastName}`}</span>
      )
    },
    {
      title: 'Destination Account',
      dataIndex: 'destinationAccount',
      key: 'destinationAccount'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency'
    },
    {
      title: 'Receipt',
      dataIndex: 'receiptPath',
      key: 'receiptPath',
      // TODO check how we will handle this
      render: receipt => (
        <a href={receipt} target="_blank" rel="noopener noreferrer">
          View
        </a>
      )
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <span>
          <Tag color={transferStatusesMap[status].color} key={status}>
            {transferStatusesMap[status].name}
          </Tag>
        </span>
      )
    }
  ];

  const fetchTransfers = async () => {
    const data = await getTransfers(projectId);
    setTransfers(data);
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={transfers}
      size="middle"
      className="TableAdmin"
      pagination={false}
    />
  );
};

export default TableAdminTransfers;

TableAdminTransfers.propTypes = {
  projectId: PropTypes.number.isRequired,
  getTransfers: PropTypes.func.isRequired
};
