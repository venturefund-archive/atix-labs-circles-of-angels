import React from 'react';
import { Table, Tag } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import './_style.scss';

const names = {
  '1': 'John Brown',
  '2': 'Jim Green',
  '3': 'Joe Black'
};

const TableAdmin = ({ data, saveStatus }) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <p>{names[record.senderId]}</p>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Receipt Number',
      dataIndex: 'transferId',
      key: 'transferId'
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: (text, record) => (
        <span>
          <select
            onChange={evnt => (record.state = evnt.currentTarget.value)}
            defaultValue={record.state}
          >
            <option value="-1">Cancelled</option>
            <option value="0">Pending</option>
            <option value="1">Reconciliation</option>
            <option value="2">Approved</option>
          </select>
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
           <CustomButton theme="Primary" buttonText="Confirm" onClick={() => {
              console.log(record);
              saveStatus(record.transferId, record.state);
            }}/>

        </span>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="middle"
      className="TableAdmin"
    />
  );
};

export default TableAdmin;
