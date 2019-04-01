import React from 'react';
import { Table, Tag, Modal } from 'antd';
import './_style.scss';
import ButtonPrimary from '../../atoms/ButtonPrimary/ButtonPrimary';
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
            onClick={async () =>
              handleConfirm(confirmProject, projectId, collection, index)
            }
          />
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

  const downloadMilestones = async projectId => {
    const response = await downloadProjectMilestonesFile(projectId);

    if (response.error) {
      const { error } = response;
      if (error.response) {
        error.response.data.error =
          // eslint-disable-next-line prettier/prettier
          'This project doesn\'t have a Milestones file uploaded';
      }
      Modal.error({
        title: error.response
          ? `${error.response.status} - ${error.response.statusText}`
          : error.message,
        content: error.response ? error.response.data.error : error.message
      });
    }
    return response;
  };

  const handleConfirm = async (action, projectId, collection, index) => {
    const confirmation = await action(projectId);

    if (confirmation.error) {
      const { error } = confirmation;
      if (error.response) {
        error.response.data.error =
          // eslint-disable-next-line prettier/prettier
          'This project doesn\'t have a Milestones file uploaded';
      }
      Modal.error({
        title: error.response
          ? `${error.response.status} - ${error.response.statusText}`
          : error.message,
        content: error.response ? error.response.data.error : error.message
      });

      return confirmation;
    }

    collection.status = confirmation.data.status;
    onStateChange(collection, index);
  };

  return (
    <span>
      <Table
        dataSource={dataSource}
        columns={columns}
        size="middle"
        className="TableBOProjects"
      />
    </span>
  );
};

export default TableBOProjects;
