import React from 'react';
import { Table, Divider, Tag } from 'antd';
import './_style.scss';

const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  { title: 'Column 9', dataIndex: 'address', key: '9' },

  {
    title: 'Oracle',
    dataIndex: 'oracle',
    key: 'oracle',
    fixed: 'right'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    fixed: 'right',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 7 ? 'green' : 'orange';
          if (tag === 'Cancel') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    render: (text, record) => (
      <span>
        <a href="www.google.com">Evidence</a>
      </span>
    )
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['Completed'],
    oracle: 'oracle 1'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['Pendind'],
    oracle: 'oracle 1'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['Pendind'],
    oracle: 'oracle 1'
  },
  {
    key: '4',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['Completed'],
    oracle: 'oracle 1'
  },
  {
    key: '5',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['Completed'],
    oracle: 'oracle 1'
  },
  {
    key: '6',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['Completed'],
    oracle: 'oracle 1'
  }
];

const TableProjectProgress = () => (
  <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
);
export default TableProjectProgress;
