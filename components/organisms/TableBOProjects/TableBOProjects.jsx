/**
 * COA PUBLIC LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Table, Tag, Button, Icon } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import projectStatusMap from '../../../model/projectStatus';
import Routing from '../../utils/Routes';
import { showModalError, showModalSuccess } from '../../utils/Modals';
import {
  confirmProject,
  rejectProject,
  downloadProjectMilestonesFile
} from '../../../api/projectApi';

const projectDetailPage = projectId => {
  Routing.toBackofficeProjectDetails({ projectId });
};

const TableBOProjects = ({ dataSource, onStateChange }) => {
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
        <Button onClick={() => downloadMilestones(projectId)}>
          Download Excel File <Icon type="download" />
        </Button>
      )
    },
    {
      title: 'Details',
      dataIndex: 'id',
      key: 'details',
      render: projectId => (
        <img
          alt="img"
          className="ProjectAccess"
          src="./static/images/icon-info.svg"
          onClick={() => projectDetailPage(projectId)}
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
    const response = await downloadProjectMilestonesFile(projectId);

    if (response.error) {
      const { error } = response;
      if (error.response) {
        error.response.data.error =
          // eslint-disable-next-line prettier/prettier
          "This project doesn't have a Milestones file uploaded";
      }
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
    return response;
  };

  const handleConfirm = async (action, projectId, collection, index) => {
    const response = await action(projectId);
    if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? 'Error Changing Project Status'
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return response;
    }

    showModalSuccess('Success!', 'Status changed correctly');

    collection.status = response.data.status;
    onStateChange(collection, index);
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      size="middle"
      className="TableBOProjects"
    />
  );
};

export default TableBOProjects;
