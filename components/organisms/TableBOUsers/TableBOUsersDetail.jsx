import React from 'react';
import { Table } from 'antd';
import Roles from '../../../constants/RolesMap';

import './_style.scss';

const TableBOUsersDetail = user => <DetailTable user={user} />;

const DetailTable = ({ user }) => {
  let columns = [];

  console.log(user);

  if (user.role.id === Roles.Funder) {
    columns = [
      {
        title: 'ID / Passport',
        dataIndex: 'identifier',
        key: 'identifier'
      },
      {
        title: 'Address',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: 'Telephone Number',
        key: 'tel',
        dataIndex: 'tel'
      }
    ];
  } else if (user.role.id === Roles.SocialEntrepreneur) {
    columns = [
      {
        title: 'Company',
        dataIndex: 'company',
        key: 'company'
      },
      {
        title: 'Registration Number',
        key: 'registrationNumber',
        dataIndex: 'registrationNumber'
      },
      {
        title: 'Address',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: 'Industry',
        key: 'industry',
        dataIndex: 'industry'
      },
      {
        title: 'Bank A/C',
        key: 'bank_account',
        dataIndex: 'bank_account'
      }
    ];
  }

  return (
    <Table
      columns={columns}
      dataSource={[user.detail]}
      size="middle"
      className="TableBOProjects"
      pagination={false}
    />
  );
};

export default TableBOUsersDetail;
