import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb, Tooltip, message } from 'antd';
import Routing from '../components/utils/Routes';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import './_style.scss';
import './_concensus.scss';
import './_project-evidence.scss';
import './_steps.scss';
import Label from '../components/atoms/Label/Label';
import DragUploadFile from '../components/molecules/DragUploadFile/DragUploadFile';
import TableEvidence from '../components/organisms/TableEvidence/TableEvidence';
import {
  getActivity,
  deleteEvidence,
  downloadEvidence,
  uploadEvidence
} from '../api/activityApi';
import { showModalSuccess, showModalError } from '../components/utils/Modals';
import FileUploadStatus from '../constants/FileUploadStatus';

const BreadCrumb = query => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <Icon type="arrow-left" />
      <a
        onClick={() =>
          Routing.toProjectProgress({
            projectId: query.projectId,
            projectName: query.projectName
          })
        }
      >
        Project Progress
      </a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Evidence</Breadcrumb.Item>
  </Breadcrumb>
);

class ProjectEvidence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadEvidenceList: []
    };
  }

  static async getInitialProps(query) {
    const { activityId, projectId, projectName } = query.query;
    const response = await getActivity(activityId);
    return {
      activity: response || {},
      projectId,
      projectName: projectName || ''
    };
  }

  handleDelete = async record => {
    const { activity } = this.props;

    const response = await deleteEvidence(
      activity.id,
      record.file,
      record.fileType
    );

    if (response.success) {
      showModalSuccess('Success', response.success);
      Routing.toProjectEvidence({ activityId: activity.id });
    } else if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
  };

  handleDownload = async record => {
    const { activity } = this.props;
    const response = await downloadEvidence(
      activity.id,
      record.file,
      record.fileType
    );

    if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
  };

  handleUpload = info => {
    const { status } = info.file;
    if (status !== FileUploadStatus.UPLOADING) {
      const files = info.fileList.map(file => file.originFileObj);
      this.setState({ uploadEvidenceList: files });
    }
    if (status === FileUploadStatus.DONE) {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  uploadFiles = async () => {
    const { activity } = this.props;
    const { uploadEvidenceList } = this.state;

    const response = await uploadEvidence(activity.id, uploadEvidenceList);

    if (response.success) {
      showModalSuccess('Success', response.success);
      Routing.toProjectEvidence({ activityId: activity.id });
    } else if (!response || response.error) {
      const { error } = response;
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
    }
  };

  render() {
    const { activity, projectName, projectId } = this.props;

    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="Content">
            <div className="DataSteps">
              <BreadCrumb query={(projectName, projectId)} />
              <div className="ProjectInfoHeader">
                <div className="space-between">
                  <div>
                    <Label labelText="project name" />
                    <h1>{projectName}</h1>
                  </div>
                </div>
              </div>
              <div className="b-right">
                <div>
                  <Label labelText="Task name" />
                  <h3>{activity.tasks}</h3>
                </div>
                <div className="flex list">
                  <span className="listItem flex">
                    <Tooltip title="Date">
                      <Icon
                        style={{ fontSize: '16px', color: '#a3a5a9' }}
                        type="calendar"
                      />
                    </Tooltip>
                    {new Intl.DateTimeFormat('en-GB').format(
                      Date.parse(activity.createdAt)
                    )}
                  </span>
                  <Divider type="vertical" />
                  <span className="listItem flex">
                    <Tooltip title="Amount">
                      <Icon
                        style={{ fontSize: '16px', color: '#a3a5a9' }}
                        type="dollar"
                      />
                    </Tooltip>
                    {activity.budget}
                  </span>
                </div>
              </div>
              <Divider />
              <Label labelText="Upload Evidence" theme="LabelBlue" />
              <DragUploadFile
                text="Upload Evidence for this task"
                description="Click or drag your file here"
                change={this.handleUpload}
              />
              <CustomButton
                theme="Primary"
                buttonText="Upload"
                onClick={this.uploadFiles}
              />
              <TableEvidence
                data={activity.evidence}
                onDelete={this.handleDelete}
                onDownload={this.handleDownload}
              />
            </div>
            <div className="ControlSteps StepOne">
              <CustomButton
                theme="Primary"
                buttonText="Back"
                onClick={() =>
                  Routing.toProjectProgress({
                    projectId,
                    projectName
                  })
                }
              />
              <CustomButton theme="Success" buttonText="Complete Task" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectEvidence;
