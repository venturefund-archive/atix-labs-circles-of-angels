/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import TableAdminTransfers from './TableAdminTransfers';
import './_style.scss';

const TableAdminProjects = ({ data, fetchTransfers }) => {
  const columns = [
    {
      title: 'Project Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'name'
    },
    {
      title: 'Owner',
      dataIndex: 'owner.firstName',
      key: 'owner.firstName'
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="middle"
      className="TableAdmin"
      expandedRowRender={record => (
        <TableAdminTransfers
          projectId={record.id}
          getTransfers={fetchTransfers}
        />
      )}
    />
  );
};

export default TableAdminProjects;

TableAdminProjects.defaultProps = {
  data: []
};

TableAdminProjects.propTypes = {
  data: PropTypes.shape({}),
  fetchTransfers: PropTypes.func.isRequired
};
