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
import { downloadProjectMilestonesFile } from '../../../api/projectApi';
import formatError from '../../../helpers/errorFormatter';
import { projectStatuses } from '../../../constants/constants';

const TableBOProjects = ({ data, onConfirm, onReject }) => {
  const history = useHistory();

  const columns = [
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
        <CustomButton
          theme="Secondary"
          icon="download"
          buttonText="Download"
          classNameIcon="iconDisplay"
          onClick={() => downloadMilestones(projectId)}
          />
      )
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

  const downloadMilestones = async projectId => {
    try {
      // TODO endpoint still not created
      const response = await downloadProjectMilestonesFile(projectId);
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
  onConfirm: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};
