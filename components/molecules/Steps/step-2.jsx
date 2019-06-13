/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Button, message } from 'antd';
import mime from 'mime-types';
import DownloadTemplate from '../DownloadTemplate/DownloadTemplate';
import DragUploadFile from '../DragUploadFile/DragUploadFile';
import FileUploadStatus from '../../../constants/FileUploadStatus';
import { withUser } from '../../utils/UserContext';
import {
  createProject,
  downloadMilestonesTemplate
} from '../../../api/projectApi';
import { showModalError } from '../../utils/Modals';

import './_style.scss';
import FileVerificationList from '../FileVerificationList/FileVerificationList';

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creationStatus: false,
      milestonesErrors: [],
      uploadDisable: false,
      verifying: false,
      filelist: []
    };
  }

  clickDownloadMilestonesTemplate = async () => {
    const res = await downloadMilestonesTemplate();
    return res;
  };

  submitProject = async () => {
    const { project, next } = this.props;
    const {
      projectProposal,
      projectCoverPhoto,
      projectCardPhoto,
      projectMilestones,
      projectAgreement
    } = project.files;

    const { user } = this.props;
    const ownerId = user.id;

    const files = [];
    files.push(projectProposal.originFileObj);
    files.push(projectCoverPhoto.originFileObj);
    files.push(projectCardPhoto.originFileObj);
    files.push(projectMilestones.originFileObj);
    files.push(projectAgreement.originFileObj);

    const newProject = {
      ...project.data,
      goalAmount: parseFloat(project.data.goalAmount)
    };
    this.verifyingFile();
    const res = await createProject(newProject, files, ownerId);

    if (res.status === 200) {
      next();
    } else if (res.error) {
      if (res.error.response && res.error.response.data.errors) {
        this.setState({
          milestonesErrors: res.error.response.data.errors,
          creationStatus: false,
          uploadDisable: false,
          verifying: false,
          filelist: []
        });
      } else {
        const { error } = res;
        const title = 'Project creation failed';
        console.log(res);
        const content = error.response
          ? error.response.data.error
          : error.message;
        showModalError(title, content);
        this.setState({
          creationStatus: false,
          verifying: false,
          uploadDisable: false,
          filelist: []
        });
      }
    }
  };

  changeMilestones = info => {
    const { project } = this.props;
    const { status } = info.file;
    const projectMilestones = info.file;

    if (status === FileUploadStatus.UPLOADING) {
      if (this.checkFileType(projectMilestones)) {
        // this needs to be here, otherwise the status will stay as 'uploading'
        project.files.projectMilestones = projectMilestones;
        this.setState({
          uploadDisable: true,
          creationStatus: true,
          filelist: [projectMilestones]
        });

        message.success(`${info.file.name} file uploaded successfully.`);
      } else {
        message.error(`${info.file.name} file type is invalid.`);
      }
    } else if (status === FileUploadStatus.DONE) {
      this.setState({
        uploadDisable: true,
        creationStatus: true,
        filelist: [projectMilestones]
      });
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
      this.setState({
        uploadDisable: true,
        creationStatus: false,
        filelist: []
      });
    }
  };

  checkFileType = file => {
    if (
      mime.lookup(file.name) === 'application/vnd.ms-excel' ||
      mime.lookup(file.name) ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return true;
    }
    return false;
  };

  verifyingFile = () => {
    this.setState({
      uploadDisable: true,
      verifying: true,
      creationStatus: false,
      milestonesErrors: []
    });
  };

  enabledUpload = () => {
    const { project } = this.props;
    project.files.projectMilestones = [];
    this.setState({
      milestonesErrors: [],
      creationStatus: false,
      uploadDisable: false,
      filelist: []
    });
  };

  render() {
    const { prev } = this.props;
    const {
      creationStatus,
      milestonesErrors,
      uploadDisable,
      verifying,
      filelist
    } = this.state;
    return (
      <div className="StepContent">
        <div className="DataSteps">
          <div className="StepDescription">
            <p className="LabelSteps">Project Milestones</p>
            <h3>
              Upload an Excel document with your project plan with your
              milestones and activities and their details. You can also download
              a Project Milestone Template to fill in the project plan
              information
            </h3>
          </div>
          <div className="ProjectDataContainer">
            <DownloadTemplate
              click={this.clickDownloadMilestonesTemplate}
              subtitle="Project's Milestones Template"
              buttontext="Download Excel File"
            />
            <div className="UploadExcelFiles">
              <DragUploadFile
                change={this.changeMilestones}
                text="Complete Excel and upload to create Milestones"
                description="Click or drag your Excel file here"
                remove={this.enabledUpload}
                disabled={uploadDisable}
                showUploadList={{ showRemoveIcon: !verifying }}
                filelist={filelist}
                accept=".xls, .xlsx"
              />
              <FileVerificationList
                errors={milestonesErrors}
                loading={verifying}
              />
            </div>
          </div>
        </div>
        <div className="ControlSteps">
          <Button style={{ marginRight: 8 }} onClick={prev}>
            Previous
          </Button>
          <Button
            type="primary"
            onClick={this.submitProject}
            disabled={!creationStatus}
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }
}

export default withUser(Step2);
