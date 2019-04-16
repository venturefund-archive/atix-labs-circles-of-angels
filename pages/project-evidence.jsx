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
import { getProject } from '../api/projectApi';
import {
  getActivity,
  deleteEvidence,
  downloadEvidence,
  uploadEvidence,
  completeActivity
} from '../api/activityApi';
import {
  showModalSuccess,
  showModalError,
  showModalConfirm
} from '../components/utils/Modals';
import FileUploadStatus from '../constants/FileUploadStatus';

const BreadCrumb = query => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <Icon type="arrow-left" />
      <a
        onClick={() =>
          Routing.toProjectProgress({
            projectId: query.projectId
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
    const { activityId, projectId } = query.query;
    const response = await getActivity(activityId);
    const project = (await getProject(projectId)).data;
    return {
      activity: response || {},
      projectId,
      projectName: project.projectName || ''
    };
  }

  goToProjectEvidence = () => {
    const { activity, projectId } = this.props;
    Routing.toProjectEvidence({ activityId: activity.id, projectId });
  };

  goToProjectProgress = () => {
    const { projectId } = this.props;
    Routing.toProjectProgress({ projectId });
  };

  handleDelete = async record => {
    const { activity } = this.props;

    const response = await deleteEvidence(
      activity.id,
      record.file,
      record.fileType
    );

    if (response.success) {
      showModalSuccess('Success', response.success);
      this.goToProjectEvidence();
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
      this.goToProjectEvidence();
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

  handleComplete = async () => {
    const { activity, projectId } = this.props;
    showModalConfirm(
      'Complete Task',
      'Do you want complete this task?',
      async () => {
        const response = await completeActivity(activity.id);
        if (response.error)
          showModalError('Error completing task', response.error);
        else {
          showModalSuccess('Success!', 'Task complete');
          this.goToProjectProgress();
        }
      }
    );
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
                onClick={this.goToProjectProgress}
              />
              <CustomButton
                theme="Success"
                buttonText="Complete Task"
                onClick={this.handleComplete}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectEvidence;
