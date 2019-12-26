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

const TableAdminProjects = ({ data, saveStatus, getTransfersOfProjects }) => {
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
      dataIndex: 'ownerName',
      key: 'owner'
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="middle"
      className="TableAdmin"
      expandedRowRender={record =>
        TableAdminTransfers({
          projectId: record.id,
          saveStatus,
          getTransfersOfProjects
        })
      }
    />
  );
};

export default TableAdminProjects;

TableAdminProjects.defaultProps = {
  data: []
};

TableAdminProjects.propTypes = {
  data: PropTypes.shape({}),
  saveStatus: PropTypes.func.isRequired,
  getTransfersOfProjects: PropTypes.func.isRequired
};
