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
    },
    {
      title: 'Registration Status',
      dataIndex: 'registrationStatus',
      key: 'registrationStatus',
      render: registrationStatus => (
        <span>
          <Tag
            color={userRegistrationStatusMap[registrationStatus.id].color}
            key={registrationStatus.id}
          >
            {userRegistrationStatusMap[registrationStatus.id].name}
          </Tag>
        </span>
      )
    },
    {
      title: 'Change Registration Status',
      dataIndex: 'id',
      key: 'changeStatus',
      render: (text, record, index) => {
        const { registrationStatus, id } = record;
        return (
          <div className="ActionButtons">
            <Select
              key={record.id}
              style={{ width: 100 }}
              showSearch
              placeholder="Registration Status"
              optionFilterProp="children"
              onChange={selected => {
                const status = JSON.parse(selected);
                if (status.id !== registrationStatus.id) {
                  onRegistrationStatusChange(id, status, index);
                }
              }}
              defaultValue={registrationStatus.name}
            >
              {registrationStatusOptions.map(status => (
                <Select.Option key={status.id} value={JSON.stringify(status)}>
                  {status.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        );
      }
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
