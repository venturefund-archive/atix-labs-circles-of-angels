import React from 'react';
import { Table, Divider, Tag } from 'antd';

const TableEvidence = ({ data, onDelete, onDownload }) => {
  const columns = [
    {
      title: 'Documents',
      dataIndex: 'fileName',
      key: 'documents'
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      render: date => (
        <span>{new Intl.DateTimeFormat('en-GB').format(Date.parse(date))}</span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span className="flex">
          <a onClick={() => onDelete(record)}>Delete</a>
          <Divider type="vertical" />
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
