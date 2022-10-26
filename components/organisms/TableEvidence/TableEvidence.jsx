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
import { Table, Divider, Button } from 'antd';

const TableEvidence = ({
  data,
  onDelete,
  onDownload,
  isActivityOracle,
  isOwner
}) => {
  const columns = [
    {
      title: 'Documents',
      dataIndex: 'fileName',
      key: 'documents',
      width: 200
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      width: 200,
      render: date => (
        <span>{new Intl.DateTimeFormat('en-GB').format(Date.parse(date))}</span>
      )
    },
    {
      title: 'Hash',
      dataIndex: 'fileHash',
      key: 'fileHash',
      render: fileHash => <span>{fileHash}</span>
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span className="flex">
          {(isActivityOracle || isOwner) && (
            <span>
              <Button type="link" onClick={() => onDelete(record)}>
                Delete
              </Button>
              <Divider type="vertical" />
            </span>
          )}
          <Button type="link" onClick={() => onDownload(record)}>
            Download
          </Button>
        </span>
      )
    }
  ];

  return (
    <Table
      title={() => 'Evidence'}
      columns={columns}
      dataSource={data}
      scroll={{ x: 1300 }}
    />
  );
};
export default TableEvidence;

TableEvidence.propTypes = {
  data: PropTypes.element.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  isActivityOracle: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired
};
