import React from 'react';
import { Table, Divider, Tag } from 'antd';

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
      width: 200,
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
      dataIndex: 'transactionHash',
      key: 'transactionHash',
      render: transactionHash => <span>{transactionHash}</span>
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span className="flex">
          {(isActivityOracle || isOwner) && (
            <span>
              <a onClick={() => onDelete(record)}>Delete</a>
              <Divider type="vertical" />
            </span>
          )}
          <a onClick={() => onDownload(record)}>Download</a>
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
