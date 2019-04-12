import React from 'react';
import { Table } from 'antd';
import TableAdminTransfers from './TableAdminTransfers';
import './_style.scss';

const TableAdminProjects = ({ data, saveStatus, getTransfersOfProjects }) => {
  const columns = [
    { title: 'Project Id', dataIndex: 'id', key: 'id' },
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
