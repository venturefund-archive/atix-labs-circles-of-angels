/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Table, Tag, Dropdown, Menu, Icon, message, Modal, Button } from 'antd';
import { useHistory } from 'react-router';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import projectStatusMap from '../../../model/projectStatus';
import { projectStatuses } from '../../../constants/constants';
import projectStatusesTransitionAdmin from '../../../constants/ProjectStatusesTransition';
import userRole from '../../../constants/RolesMap';
import { downloadFileFromPath } from '../../utils/FileUtils';
import { updateProjectStatus } from '../../../api/projectApi';
import { useUserContext } from '../../utils/UserContext';
import CustomFormModal from '../CustomFormModal/CustomFormModal';
import { newProjectFormItems } from '../../../helpers/createProjectFormFields';

const TableBOProjects = ({ data, onConfirm, onReject, fetchProjects }) => {
  const { getLoggedUser } = useUserContext();
  const user = getLoggedUser();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [statusSelected, setStatusSelected] = useState(null);
  const [projectSelected, setProjectSelected] = useState(null);
  const [modalRejectVisible, setModalRejectVisible] = useState(false);
  const [rejectedProject, setRejectedProject] = useState('');

  const handleMenuClick = e => {
    setStatusSelected(e.key);
    setShowModal(true);
  };

  const changeStatusByAdmin = async () => {
    try {
      if (statusSelected === projectStatuses.REJECTED) {
        setModalRejectVisible(true);
        setRejectedProject(projectSelected);
      } else {
        await updateProjectStatus(projectSelected, { status: statusSelected });
        fetchProjects();
        message.success('Project status changed correctly');
      }
    } catch (error) {
      message.error(error);
    } finally {
      setShowModal(false);
    }
  };

  const getProjectStatuses = status => {
    const availablestatuses = projectStatusesTransitionAdmin[status];
    return (
      <Menu onClick={handleMenuClick}>
        {Object.keys(availablestatuses).map(key => (
          <Menu.Item key={availablestatuses[key]}>
            {availablestatuses[key]}
          </Menu.Item>
        ))}
      </Menu>
    );
  };
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
      // eslint-disable-next-line react/prop-types
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
            onClick={() => handleRejectionButton(id)}
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
      // eslint-disable-next-line react/prop-types
      render: ({ id, status }) => {

        const availablestatuses = projectStatusesTransitionAdmin[status];
        if (!availablestatuses.length) {
          return;
        }
        return (
          <Dropdown overlay={getProjectStatuses(status)} trigger={['click']}>
            <Button onClick={() => setProjectSelected(id)}>
              Change project status <Icon type="down" />
            </Button>
          </Dropdown>
        );
      }
    }
  ];

  const goToProjectDetail = projectId =>
    history.push(`/project-detail?id=${projectId}`);

  const handleRejectionButton = id => {
    setModalRejectVisible(true);
    setRejectedProject(id);
  };

  const onRejectProject = rejectionData => {
    let reason;
    rejectionData.forEach(value => {
      reason = value;
    });
    onReject(rejectedProject, reason);
  };

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
      <CustomFormModal
        title="Reject project"
        formItems={newProjectFormItems}
        visible={modalRejectVisible}
        onConfirm={onRejectProject}
        onClose={() => setModalRejectVisible(false)}
      />
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
  onReject: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired
};
