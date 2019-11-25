/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Table, Tag, Select } from 'antd';
import './_style.scss';
import userRegistrationStatusMap from '../../../model/userRegistrationStatusMap';
import UserAnswer from './UserAnswer';

const TableBOUsers = ({
  dataSource,
  onRegistrationStatusChange,
  registrationStatusOptions,
  filters
}) => {
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role.name',
      key: 'role',
      filters: filters.roles,
      onFilter: (value, record) =>
        record.role && record.role.name && record.role.name.indexOf(value) === 0
    }
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      size="middle"
      className="TableBOProjects"
      expandedRowRender={render => <UserAnswer user={render} />}
    />
  );
};

export default TableBOUsers;
