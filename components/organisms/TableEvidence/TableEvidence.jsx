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
      dataIndex: 'hash',
      key: 'hash',
      render: date => (
        <span>760e7dab2836853c63805033e51466760e7dab2836853c63805033e514668301fa9c478301fa9c47</span>
      )
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
