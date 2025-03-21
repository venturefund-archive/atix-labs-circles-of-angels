/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { Table, Tag } from 'antd';
import { transferPropType } from '../../../helpers/proptypes';
import transferStatusesMap from '../../../model/transferStatusesMap';
import TransferStatuses from '../../../constants/TransferStatuses';
import '../TableProjectProgress/_tablestyle.scss';
import './_style.scss';
import DrawerBlockchain from '../DrawerBlockchain/DrawerBlockchain';
import { buildTransferBlockchainData } from '../../../helpers/blockchainData';

const transferStatusTag = (status, rejectionReason) => {
  const transferStatus = rejectionReason
    ? transferStatusesMap.rejected
    : transferStatusesMap[status];
  return (
    <Tag color={transferStatus.color} key={status}>
      {transferStatus.name}
    </Tag>
  );
};

const blockchainDrawerTitle = (
  <p>
    This fund transfer was saved on the
    <b> Blockchain</b>
  </p>
);

const TableTransfer = ({ transfers, fetchBlockchainData }) => {
  const columns = [
    {
      title: 'Transfer Id',
      dataIndex: 'transferId',
      key: 'transferId'
    },
    {
      title: 'Sender',
      key: 'sender',
      // eslint-disable-next-line react/prop-types
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
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status, { rejectionReason }) => {
        if (!status) return;
        return <span>{transferStatusTag(status, rejectionReason)}</span>;
      }
    },
    {
      render: transfer =>
        [TransferStatuses.VERIFIED, TransferStatuses.CANCELLED].includes(
          transfer.status
        ) && (
          <DrawerBlockchain
            title={blockchainDrawerTitle}
            onLoad={() => fetchBlockchainData(transfer.id)}
            noDataMessage="Could not fetch the blockchain information for this fund transfer"
            dataBuilder={buildTransferBlockchainData}
            extraData={{
              status: transferStatusTag(
                transfer.status,
                transfer.rejectionReason
              )
            }}
          />
        )
    }
  ];

  return (
    <Table
      className="TableTransfer"
      columns={columns}
      dataSource={transfers}
      locale={{
        emptyText: (
          <p>
            No fund transfers have been received yet.
            <br />
            All transfers made to the project by the funders will be listed
            here.
          </p>
        )
      }}
    />
  );
};

export default TableTransfer;

TableTransfer.defaultProps = {
  transfers: []
};

TableTransfer.propTypes = {
  transfers: PropTypes.arrayOf(transferPropType),
  fetchBlockchainData: PropTypes.func.isRequired
};
