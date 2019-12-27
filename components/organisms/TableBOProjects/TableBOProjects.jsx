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
import { Table, Tag, Icon, message } from 'antd';
import { useHistory } from 'react-router';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import projectStatusMap from '../../../model/projectStatus';
import {
  confirmProject,
  rejectProject,
  downloadProjectMilestonesFile
} from '../../../api/projectApi';
import formatError from '../../../helpers/errorFormatter';

const TableBOProjects = ({ data, onStateChange }) => {
  const history = useHistory();

  const columns = [
    // TODO Relation between user and project schemas is not done yet.
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
      dataIndex: 'id',
      key: 'milestones',
      render: projectId => (
        <CustomButton onClick={() => downloadMilestones(projectId)}>
          <Icon type="download" />
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
      // TODO endpoint still not created
      const response = await downloadProjectMilestonesFile(projectId);
      return response;
    } catch (error) {
      message.error(formatError(error));
    }
  };

  const handleConfirm = async (action, projectId, collection, index) => {
    // TODO fix error handle when confirm and reject project are fixed.
    try {
      const response = await action(projectId);

      const newCollection = Object.assign({}, collection, {
        status: response.data.status
      });

      onStateChange(index, newCollection);

      message.success('Status changed correctly');
      return response;
    } catch (error) {
      message.error(formatError(error));
    }
  };

  const goToProjectDetail = projectId =>
    history.push(`/project-detail?id=${projectId}`);

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
