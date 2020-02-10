/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Table, Tag, Col, message } from 'antd';
import transferStatusesMap from '../../../model/transferStatusesMap';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ModalRejectedClaim from '../ModalRejectedClaim/ModalRejectedClaim';
import {
  addApprovedTransferClaim,
  addDisapprovedTransferClaim
} from '../../../api/transferApi';

const TableAdminTransfers = ({ projectId, getTransfers }) => {
  const [transfers, setTransfers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [transferSelected, setTransferSelected] = useState(undefined);

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
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: transferId => (
        <Fragment>
          <Col span={8}>
            <CustomButton
              theme="Primary"
              key="back"
              buttonText="Approve"
              onClick={() => {
                setTransferSelected(transferId);
                onApprovedTransfer();
              }}
            />
          </Col>
          <Col span={8}>
            <CustomButton
              theme="Sencondary"
              key="back"
              buttonText="Reject"
              onClick={() => {
                setTransferSelected(transferId);
                onShowModal();
              }}
            />
          </Col>
        </Fragment>
      )
    }
  ];

  const fetchTransfers = async () => {
    const data = await getTransfers(projectId);
    setTransfers(data);
  };

  const onApprovedTransfer = async transferId => {
    const response = await addApprovedTransferClaim(transferId);
    if (response.errors) {
      message.error(response.errors);
      return;
    }

    message.success('Transfer approved successfully!');
    fetchTransfers();
  };

  const onRejectTransfer = async reason => {
    const response = await addDisapprovedTransferClaim(
      transferSelected,
      reason
    );
    if (response.errors) {
      message.error(response.errors);
      return;
    }

    message.success('Transfer rejected successfully!');
    fetchTransfers();
    setVisible(false);
  };

  const onShowModal = () => setVisible(true);

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={transfers}
        size="middle"
        className="TableAdmin"
        pagination={false}
      />
      <ModalRejectedClaim
        visible={visible}
        onSubmit={onRejectTransfer}
        onClose={() => setVisible(false)}
      />
    </Fragment>
  );
};

export default TableAdminTransfers;

TableAdminTransfers.propTypes = {
  projectId: PropTypes.number.isRequired,
  getTransfers: PropTypes.func.isRequired
};
