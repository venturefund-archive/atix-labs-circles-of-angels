/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Table, Tag, Dropdown, Menu, Icon, message, Modal } from 'antd';
import { useHistory } from 'react-router';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import projectStatusMap from '../../../model/projectStatus';
import { projectStatuses } from '../../../constants/constants';
import userRole from '../../../constants/RolesMap';
import { downloadFileFromPath } from '../../utils/FileUtils';
import { updateProjectStatus } from '../../../api/projectApi';
import { useUserContext } from '../../utils/UserContext';

const TableBOProjects = ({ data, onConfirm, onReject, fetchProjects }) => {
  const { getLoggedUser } = useUserContext();
  const user = getLoggedUser();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [statusSelected, setStatusSelected] = useState(null);
  const [projectSelected, setProjectSelected] = useState(null);

  const handleMenuClick = e => {
    setStatusSelected(e.key);
    setShowModal(true);
  };

  const changeStatusByAdmin = async () => {
    try {
      await updateProjectStatus(projectSelected, statusSelected);
      fetchProjects();
      message.success('Project status changed correctly');
    } catch (error) {
      message.error(error);
    } finally {
      setShowModal(false);
    }
  };

  const getProjectStatuses = () => (
    <Menu onClick={handleMenuClick}>
      {Object.keys(projectStatuses).map(function(key) {
        return (
          <Menu.Item key={projectStatuses[key]}>
            {projectStatuses[key]}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  const curatorColumns = [
    {
      title: 'User',
      dataIndex: 'owner.firstName',
      key: 'firstName'
    },
    {
      title: 'Project',
      dataIndex: 'projectName',
      key: 'projectName'
    },
    {
      title: 'Milestones',
      dataIndex: 'milestonePath',
      key: 'milestones',
      render: milestonePath =>
        milestonePath && (
          <CustomButton
            theme="Secondary"
            icon="download"
            buttonText="Download"
            classNameIcon="iconDisplay"
            onClick={() =>
              downloadFileFromPath(milestonePath, 'milestones.xlsx')
            }
          />
        ) // TODO: show something else if !milestonePath?
    },
    {
      title: 'Details',
      dataIndex: 'id',
      key: 'details',
      render: projectId => (
        <CustomButton
          theme="Secondary"
          icon="eye"
          buttonText="View"
          classNameIcon="iconDisplay"
          onClick={() => goToProjectDetail(projectId)}
        />
      )
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <span>
          <Tag color={projectStatusMap[status].color} key={status}>
            {projectStatusMap[status].name}
          </Tag>
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'action',
      render: ({ id, status }) => (
        <div className="ActionButtons">
          <CustomButton
            theme="Primary"
            buttonText="Confirm"
            hidden={status !== projectStatuses.TO_REVIEW}
            onClick={() => onConfirm(id)}
          />
          <CustomButton
            theme="Cancel"
            buttonText="Reject"
            hidden={status !== projectStatuses.TO_REVIEW}
            onClick={() => onReject(id)}
          />
        </div>
      )
    }
  ];

  const adminColumns = [
    {
      title: 'User',
      dataIndex: 'owner.firstName',
      key: 'firstName'
    },
    {
      title: 'Project',
      dataIndex: 'projectName',
      key: 'projectName'
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <span>
          <Tag color={projectStatusMap[status].color} key={status}>
            {projectStatusMap[status].name}
          </Tag>
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'action',
      render: ({ id, status }) => (
        <Dropdown overlay={getProjectStatuses(status)} trigger={['click']}>
          <a
            className="ant-dropdown-link"
            onClick={() => setProjectSelected(id)}
          >
            Change project status <Icon type="down" />
          </a>
        </Dropdown>
      )
    }
  ];

  const goToProjectDetail = projectId =>
    history.push(`/project-detail?id=${projectId}`);
  return (
    <>
      <Table
        dataSource={data}
        columns={
          user.role === userRole.COA_ADMIN ? adminColumns : curatorColumns
        }
        size="middle"
        className="TableBOProjects"
      />
      <Modal
        title="Change status"
        visible={showModal}
        onOk={() => changeStatusByAdmin()}
        onCancel={() => setShowModal(false)}
      >
        <p>Are you sure you want to change status to {statusSelected}? </p>
      </Modal>
    </>
  );
};

export default TableBOProjects;

TableBOProjects.defaultProps = {
  data: []
};

TableBOProjects.propTypes = {
  data: PropTypes.arrayOf({}),
  onConfirm: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};
