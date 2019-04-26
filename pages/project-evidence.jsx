import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb, Tooltip, message, Tag } from 'antd';
import { isEmpty } from 'lodash';
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
import FileType from '../constants/FileTypes';
import { withUser } from '../components/utils/UserContext';
import MilestoneActivityStatus from '../constants/MilestoneActivityStatus';

const HashIcon = () => (
  <img src="/static/images/hashIcon.svg" alt="hash" width="15" />
);

const BreadCrumb = query => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <Icon type="arrow-left" />
      <a
        onClick={() =>
          Routing.toProjectProgress({
            projectId: query.query
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
      projectName: project.projectName || '',
      projectOwner: project.ownerId
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
      record.fileType === FileType.PHOTO ? record.photo : record.file,
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
      record.fileType === FileType.PHOTO ? record.photo : record.file,
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
    const { activity } = this.props;
    showModalConfirm(
      'Complete Activity',
      'Do you want to complete this activity?',
      async () => {
        const response = await completeActivity(activity.id);
        if (response.error)
          showModalError('Error completing activity', response.error);
        else {
          showModalSuccess('Success!', 'Activity complete');
          this.goToProjectProgress();
        }
      }
    );
  };

  render() {
    const {
      activity,
      projectName,
      projectId,
      isSocialEntrepreneur,
      isBackofficeAdmin,
      isOracle,
      user,
      projectOwner
    } = this.props;

    const { uploadEvidenceList } = this.state;

    console.log('ACTIVITY', activity);

    const isActivityOracle =
      isOracle &&
      activity.oracle &&
      activity.oracle.user.id &&
      user.id === activity.oracle.user.id;
    const isOwner = isSocialEntrepreneur && user.id === projectOwner;

    const disableUpload = isEmpty(uploadEvidenceList);

    const completedActivity =
      activity.status === MilestoneActivityStatus.COMPLETED;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="Content">
            <div className="DataSteps">
              <BreadCrumb query={projectId} />

              <div className="ProjectInfoHeader">
                <div className="space-between">
                  <div>
                    <Label labelText="project name" />
                    <h1>{projectName}</h1>
                  </div>
                </div>
              </div>
              <div className="StepDescription">
                <h3>
                  Upload evidence and help verify this activity, mark it as complete
                  once all evidence has been uploaded
                </h3>
              </div>
              <div className="b-right">
                <div>
                  <div className="flex">
                    <Label labelText="Activity name" />
                    {completedActivity ? (
                      <Tag color="green">This activity was completed!</Tag>
                    ) : (
                      ''
                    )}
                  </div>
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
                  <Divider type="vertical" />
                  <span className="listItem flex">
                    <Tooltip title="Hash">
                      <Icon component={HashIcon} />
                    </Tooltip>
                    {activity.transactionHash}
                  </span>
                </div>
              </div>

              <Divider />

              {(isBackofficeAdmin ||
                isSocialEntrepreneur ||
                isActivityOracle) &&
              !completedActivity ? (
                <div>
                  <Label labelText="Upload Evidence" theme="LabelBlue" />
                  <DragUploadFile
                    text="Upload Evidence for this activity"
                    description="Click or drag your file here"
                    change={this.handleUpload}
                    accept=".pdf, .ppt, .docx, .doc, image/*"
                  />
                  <CustomButton
                    theme="Primary"
                    disabled={disableUpload}
                    buttonText="Upload"
                    onClick={this.uploadFiles}
                  />
                </div>
              ) : (
                ''
              )}
              <TableEvidence
                data={activity.evidence}
                onDelete={this.handleDelete}
                onDownload={this.handleDownload}
                isActivityOracle={isActivityOracle}
                isOwner={isOwner}
              />
            </div>
            <div className="ControlSteps StepOne">
              {isActivityOracle &&
              !completedActivity &&
              !isEmpty(activity.evidence) ? (
                <CustomButton
                  theme="Success"
                  buttonText="Complete Activity"
                  onClick={this.handleComplete}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(ProjectEvidence);
