import React from 'react';
import { Table, Divider, Tag } from 'antd';

const columns = [
  {
    title: 'Documents',
    dataIndex: 'documents',
    key: 'documents'
  },
  {
    title: 'date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span className="flex">
      <a

      >
        Delete
      </a>
      <Divider type="vertical" />
      <a
      >
        Download
      </a>
    </span>
    )
  }
];

const data = [
  {
    key: '1',
    documents: 'Invoice 1',
    date: '20/07/2019'
  }
];

const TableEvidence = () => (
  <Table
    title={() => 'Evidence'}
    columns={columns}
    dataSource={data}
    scroll={{ x: 1300 }}
  />
);
export default TableEvidence;
