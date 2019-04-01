import React from 'react';
import { Table, Tag } from 'antd';
import './_style.scss';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ButtonCancel from '../../atoms/ButtonCancel/ButtonCancel';
import ButtonDownload from '../../atoms/ButtonDownload/ButtonDownload';
import projectStatusMap from '../../../model/projectStatus';
import Routing from '../../utils/Routes';
import {
  confirmProject,
  rejectProject,
  downloadProjectMilestonesFile
} from '../../../api/projectApi';

const projectDetailPage = projectId => {
  Routing.toBackofficeProjectDetails({ projectId });
};

const downloadMilestones = async projectId => {
  await downloadProjectMilestonesFile(projectId);
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
          <CustomButton theme="Primary" buttonText="confirm" onClick={async () =>
              handleConfirm(confirmProject, projectId, collection, index)
            } />
          <ButtonCancel
            text="Reject"
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
