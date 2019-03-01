import React from "react";
import { Table, Tag } from 'antd';

import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";

import './_style.scss';

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'User',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Amount',
  dataIndex: 'amount',
  key: 'amount',
}, {
  title: 'Receipt Number',
  dataIndex: 'receipt',
  key: 'receipt',
}, {
  title: 'Status',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
          {tags.map(tag => <Tag color="green" key={tag}>{tag}</Tag>)}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <ButtonPrimary text="confirm"/>
    </span>
  ),
}];

const data = [{
  key: '1',
  id: '#0001',
  name: 'John Brown',
  amount: '$ 10.000',
  receipt: '123456789',
  tags: ['Fund Receive'],
}, {
  key: '2',
  id: '#0002',
  name: 'Jim Green',
  amount: '$ 15.000',
  receipt: '123456789',
  tags: ['Fund Receive'],
}, {
  key: '3',
  id: '#0003',
  name: 'Joe Black',
  amount: '$ 5.000',
  receipt: '123456789',
  tags: ['Fund Receive'],
}];

const TableAdmin = () => (
  <Table columns={columns} dataSource={data} size="middle" className="TableAdmin" />
);

export default TableAdmin;
