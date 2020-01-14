/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Table, Select, Divider, Modal, Icon, Tag, Input } from 'antd';
import { withUser } from '../../utils/UserContext';
import EditableCell from '../../molecules/EditableCell/EditableCell';
import '../TableProjectProgress/_tablestyle.scss';
import './_style.scss';

const { TextArea } = Input;

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
    title: 'From',
    dataIndex: 'from',
    key: 'from'
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'rechazado') {
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
    render: (text, record) => (
      <span>
        <a>Receive</a>
        <Divider type="vertical" />
        <a>Aprobar {record.name}</a>
        <Divider type="vertical" />
        <a className="TextRed">Delete</a>
      </span>
    )
  }
];

const data = [
  {
    key: '1',
    id: 'John Brown',
    from: 'Joe Black',
    amount: 'John Brown',
    status: ['aprobado']
  },
  {
    key: '2',
    id: 'Jim Green',
    from: 'Joe Black',
    amount: 'London No. 1 Lake Park',
    status: ['loser']
  },
  {
    key: '3',
    id: 'Joe Black',
    from: 'Joe Black',
    amount: 'Sidney No. 1 Lake Park',
    status: ['pendiente']
  }
];

const TableTransfer = () => (
  <Table className="TableTransfer" columns={columns} dataSource={data} />
);

export default TableTransfer;
