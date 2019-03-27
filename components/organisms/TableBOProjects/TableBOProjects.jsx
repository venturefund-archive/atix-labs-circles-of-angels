import React from 'react';
import { Table, Tag } from 'antd';
import Router from 'next/router';

import './_style.scss';
import ButtonPrimary from '../../atoms/ButtonPrimary/ButtonPrimary';
import ButtonCancel from '../../atoms/ButtonCancel/ButtonCancel';
import ButtonDownload from '../../atoms/ButtonDownload/ButtonDownload';
import projectStatusMap from '../../../model/projectStatus';
import {
  confirmProject,
  rejectProject,
  downloadProjectMilestonesFile
} from '../../../api/projectApi';

const projectDetailPage = projectId => {
  console.log(projectId);
  Router.push(
    {
      pathname: '/back-office-project-detail',
      query: { projectId }
    },
    '/back-office-project-detail'
  );
};

const downloadMilestones = async projectId => {
  const response = await downloadProjectMilestonesFile(projectId);
  console.log(response);
  console.log(projectId);
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
      render: projectId => {
        return (
          <ButtonDownload
            text="Download Excel"
            onClick={() => downloadMilestones(projectId)}
          />
        );
      }
    },
    {
      title: 'Details',
      dataIndex: 'id',
      key: 'details',
      render: projectId => {
        return (
          <img
            className="ProjectAccess"
            src="./static/images/icon-info.svg"
            onClick={() => projectDetailPage(projectId)}
          />
        );
      }
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
          <ButtonPrimary
            text="confirm"
            disabled={collection.status !== 0}
            onClick={async () =>
              handleConfirm(confirmProject, projectId, collection, index)
            }
          />
          <ButtonCancel
            text="Reject"
            disabled={collection.status !== 0}
            onClick={async () =>
              handleConfirm(rejectProject, projectId, collection, index)
            }
          />
        </div>
      )
    }
  ];

  const handleConfirm = async (action, projectId, collection, index) => {
    const confirmation = await action(projectId);
    collection.status = confirmation.data.status;
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
