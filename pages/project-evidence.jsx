import React, { Component } from 'react';
import { Divider, Icon, Breadcrumb, Tooltip, message, Tag } from 'antd';
import { isEmpty } from 'lodash';
import mime from 'mime-types';
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
      uploadEvidenceList: [],
      project: {}
    };
  }

  static async getInitialProps(query) {
    const { activityId, projectId } = query.query;
    return { activityId, projectId };
  }

  componentDidMount = async () => {
    const { activityId, projectId } = this.props;
    const response = await getActivity(activityId);
    const project = (await getProject(projectId)).data;
    this.setState({
      activity: response || {},
      project
    });
  };

  goToProjectEvidence = () => {
    const { projectId } = this.props;
    const { activity } = this.state;

    Routing.toProjectEvidence({ activityId: activity.id, projectId });
  };

  goToProjectProgress = () => {
    const { projectId } = this.props;
    Routing.toProjectProgress({ projectId });
  };

  handleDelete = async record => {
    const { activity } = this.state;

    const response = await deleteEvidence(
      activity.id,
      record.fileType === FileType.PHOTO ? record.photo : record.file,
      record.fileType
    );

    if (response.success) {
      showModalSuccess('Success', response.success);
      const updatedActivity = await getActivity(activity.id);
      this.setState({
        activity: updatedActivity || {}
      });
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
    const { activity } = this.state;
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
    const { uploadEvidenceList } = this.state;
    const { status } = info.file;

    const filelist = [...uploadEvidenceList];
    if (status === FileUploadStatus.UPLOADING) {
      if (this.checkFileType(info.file)) {
        filelist.push(info.file.originFileObj);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else {
        message.error(`${info.file.name} file type is invalid.`);
      }
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    } else if (status === FileUploadStatus.REMOVED) {
      filelist.splice(filelist.indexOf(info.file.originFileObj), 1);
    }
    this.setState({ uploadEvidenceList: filelist });
  };

  uploadFiles = async () => {
    const { uploadEvidenceList, activity } = this.state;

    const response = await uploadEvidence(activity.id, uploadEvidenceList);

    if (response.success) {
      showModalSuccess('Success', response.success);
      const updatedActivity = await getActivity(activity.id);
      this.setState({
        uploadEvidenceList: [],
        activity: updatedActivity || {}
      });
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
    const { activity } = this.state;
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

  checkFileType = file => {
    const fileType = mime.lookup(file.name);
    if (
      fileType.includes('image/') ||
      fileType === 'application/pdf' ||
      fileType === 'application/msword' ||
      fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/vnd.ms-powerpoint' ||
      fileType ===
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
      return true;
    }
    return false;
  };

  render() {
    const { activity, project, uploadEvidenceList } = this.state;
    if (!activity || !project) return '';
    const {
      projectId,
      user,
      isBackofficeAdmin,
      isOracle,
      isSocialEntrepreneur
    } = this.props;
    const { projectName, projectOwner } = project;

    const isActivityOracle =
      isOracle &&
      activity.oracle &&
      activity.oracle.user.id &&
      user.id === activity.oracle.user.id;
    const isOwner = isSocialEntrepreneur && user.id === projectOwner;

    const disableUpload = isEmpty(uploadEvidenceList);

    const completedActivity =
      activity.status === MilestoneActivityStatus.COMPLETED;
    const canUploadEvidences =
      (isBackofficeAdmin || isSocialEntrepreneur || isActivityOracle) &&
      !completedActivity;
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
                {canUploadEvidences ? (
                  <h3>
                    Upload evidence and help verify this task, mark it as
                    complete once all evidence has been uploaded
                  </h3>
                ) : (
                  <h3>View actual uploaded evidences</h3>
                )}
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
                <div className="flex list relative">
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
                  {activity.transactionHash && (
                    <div className="hashDisplay">
                      <span className="listItem flex">
                        <Tooltip title="Hash">
                          <Icon component={HashIcon} />
                        </Tooltip>
                        {activity.transactionHash}
                      </span>
                      <div className="speech-bubble-ds">
                        <p>
                          <strong>What´s a HASH? </strong> This is the
                          transaction id in the Blockchain that indicates when
                          the Task was deemed as completed
                        </p>
                        <div className="speech-bubble-ds-arrow" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Divider />

              {canUploadEvidences ? (
                <div>
                  <Label labelText="Upload Evidence" theme="LabelBlue" />
                  <DragUploadFile
                    text="Upload Evidence for this activity"
                    description="Click or drag your file here"
                    change={this.handleUpload}
                    accept=".pdf, .ppt, .pptx, .docx, .doc, image/*"
                    filelist={uploadEvidenceList}
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
