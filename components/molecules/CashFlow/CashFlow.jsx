import { Table } from 'antd';
import React from 'react';
import './_style.scss';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'Activity Type',
    dataIndex: 'activityType',
    key: 'activityType'
  },
  {
    title: 'Current Amount',
    dataIndex: 'currentAmount',
    key: 'currentAmount',
    render: text => <span className="cashFlow__table__currentAmount">{text}</span>
  },
  {
    title: 'Destination Account',
    dataIndex: 'destinationAccount',
    key: 'destinationAccount'
  }
];

const data = [
  {
    date: '23/02/2022 18:50',
    role: 'Investor',
    username: 'Juan Pablo Lorek',
    activityType: 'FUNDING',
    currentAmount: 'US$ 50.000',
    destinationAccount:
      'JPMorgan Chase Bank N.A. 270 Park Avenue, 30th Floor New York, NY 10017  ABA 021 000 021 Swift CHASUS33 For Account Number 2916522432 For Account of FUNDACION TZEDAKA'
  },
  {
    date: '23/02/2022 18:50',
    role: 'Investor',
    username: 'Juan Pablo Lorek',
    activityType: 'FUNDING',
    currentAmount: 'US$ 50.000',
    destinationAccount:
      'JPMorgan Chase Bank N.A. 270 Park Avenue, 30th Floor New York, NY 10017  ABA 021 000 021 Swift CHASUS33 For Account Number 2916522432 For Account of FUNDACION TZEDAKA'
  },
  {
    date: '23/02/2022 18:50',
    role: 'Investor',
    username: 'Juan Pablo Lorek',
    activityType: 'FUNDING',
    currentAmount: 'US$ 50.000',
    destinationAccount:
      'JPMorgan Chase Bank N.A. 270 Park Avenue, 30th Floor New York, NY 10017  ABA 021 000 021 Swift CHASUS33 For Account Number 2916522432 For Account of FUNDACION TZEDAKA'
  }
];

const CashFlow = ({ remove }) => {
  console.log({ remove });
  return (
    <>
      <Table columns={columns} dataSource={data} className="cashFlow__table" />
    </>
  );
};

export default CashFlow;
