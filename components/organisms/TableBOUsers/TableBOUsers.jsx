/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './_style.scss';
import UserAnswer from './UserAnswer';

const TableBOUsers = ({ data, filters }) => {
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: filters && filters.roles,
      onFilter: (value, record) => record.role && !record.role.indexOf(value)
    }
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      size="middle"
      className="TableBOProjects"
      expandedRowRender={render => <UserAnswer user={render} />}
    />
  );
};

export default TableBOUsers;

TableBOUsers.defaultProps = {
  data: [],
  filters: []
};

TableBOUsers.propTypes = {
  data: PropTypes.arrayOf({}),
  filters: PropTypes.shape({})
};
