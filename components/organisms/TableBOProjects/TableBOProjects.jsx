/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Table, Tag, Icon } from 'antd';
import { useHistory } from 'react-router';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import projectStatusMap from '../../../model/projectStatus';
import { showModalError, showModalSuccess } from '../../utils/Modals';
import {
  confirmProject,
  rejectProject,
  downloadProjectMilestonesFile
} from '../../../api/projectApi';

const TableBOProjects = ({ data, onStateChange }) => {
  const history = useHistory();

  const columns = [
    {
      title: 'User',
      dataIndex: 'ownerName',
      key: 'ownerName'
    },
    {
      title: 'Project',
      dataIndex: 'projectName',
      key: 'projectName'
    },
    {
      title: 'Milestones',
      dataIndex: 'id',
      key: 'milestones',
      render: projectId => (
        <CustomButton onClick={() => downloadMilestones(projectId)}>
          Download Excel File <Icon type="download" />
        </CustomButton>
      )
    },
    {
      title: 'Details',
      dataIndex: 'id',
      key: 'details',
      render: projectId => (
        <CustomButton
          className="ProjectAccess"
          onClick={() => goToProjectDetail(projectId)}
        >
          <img alt="img" src="./static/images/icon-info.svg" />
        </CustomButton>
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
      dataIndex: 'id',
      key: 'action',
      render: (projectId, collection, index) => (
        <div className="ActionButtons">
          <CustomButton
            theme="Primary"
            buttonText="Confirm"
            onClick={async () =>
              handleConfirm(confirmProject, projectId, collection, index)
            }
          />
          <CustomButton
            theme="Cancel"
            buttonText="Reject"
            onClick={async () =>
              handleConfirm(rejectProject, projectId, collection, index)
            }
          />
        </div>
      )
    }
  ];

  const downloadMilestones = async projectId => {
    try {
      const response = await downloadProjectMilestonesFile(projectId);
      return response;
    } catch (error) {
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
  };

  const handleConfirm = async (action, projectId, collection, index) => {
    try {
      const response = await action(projectId);

      const newCollection = Object.assign({}, collection, {
        status: response.data.status
      });

      onStateChange(newCollection, index);

      showModalSuccess('Success!', 'Status changed correctly');
      return response;
    } catch (error) {
      const title = error.response
        ? 'Error Changing Project Status'
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
  };

  const goToProjectDetail = projectId =>
    history.push(`/project-detail?proyectId=${projectId}`);

  return (
    <Table
      dataSource={data}
      columns={columns}
      size="middle"
      className="TableBOProjects"
    />
  );
};

export default TableBOProjects;

TableBOProjects.defaultProps = {
  data: []
};

TableBOProjects.propTypes = {
  data: PropTypes.arrayOf({}),
  onStateChange: PropTypes.func.isRequired
};
