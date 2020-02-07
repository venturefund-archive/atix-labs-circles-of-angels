/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { transferPropType } from '../../../helpers/proptypes';
import transferStatusesMap from '../../../model/transferStatusesMap';
import '../TableProjectProgress/_tablestyle.scss';
import './_style.scss';

const TableTransfer = ({ transfers }) => {
  // TODO check which fields will be showed
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Sender',
      dataIndex: 'sender',
      key: 'sender'
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

  return (
    <Table className="TableTransfer" columns={columns} dataSource={transfers} />
  );
};

export default TableTransfer;

TableTransfer.defaultProps = {
  transfers: []
};

TableTransfer.propTypes = {
  transfers: PropTypes.arrayOf(transferPropType)
};
