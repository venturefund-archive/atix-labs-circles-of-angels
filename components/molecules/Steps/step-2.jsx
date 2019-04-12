import React from 'react';
import { Button, message } from 'antd';
import DownloadTemplate from '../DownloadTemplate/DownloadTemplate';
import DragUploadFile from '../DragUploadFile/DragUploadFile';
import FileUploadStatus from '../../../constants/FileUploadStatus';
import { withUser } from '../../utils/UserContext';
import {
  createProject,
  downloadMilestonesTemplate
} from '../../../api/projectApi';

import './_style.scss';
import FileVerificationList from '../FileVerificationList/FileVerificationList';

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creationStatus: 1, // 1: Pending, 0: Error
      milestonesErrors: []
    };
  }

  clickDownloadMilestonesTemplate = async () => {
    const res = await downloadMilestonesTemplate();
    console.log(res);
    return res;
  };

  submitProject = async () => {
    const { project, next } = this.props;
    const {
      projectProposal,
      projectCoverPhoto,
      projectCardPhoto,
      projectMilestones
    } = project.files;

    const { user } = this.props;
    const ownerId = user.id;

    const files = [];
    files.push(projectProposal.originFileObj);
    files.push(projectCoverPhoto.originFileObj);
    files.push(projectCardPhoto.originFileObj);
    files.push(projectMilestones.originFileObj);

    const newProject = {
      ...project.data,
      goalAmount: parseFloat(project.data.goalAmount)
    };
    console.log(newProject, files);
    const res = await createProject(newProject, files, ownerId);

    console.log(res);
    if (res.status === 200) {
      next();
    } else if (res.error.response.data.error) {
      alert(res.error.response.data.error);
      this.setState({ creationStatus: 0 });
    } else if (res.error.response.data.errors) {
      this.setState({ milestonesErrors: res.error.response.data.errors });
      this.setState({ creationStatus: 0 });
    }
  };

  changeMilestones = info => {
    const { project } = this.props;
    const { status } = info.file;
    const projectMilestones = info.file;
    if (status !== FileUploadStatus.UPLOADING) {
      console.log(info.file, info.fileList);
    }
    if (status === FileUploadStatus.DONE) {
      message.success(`${info.file.name} file uploaded successfully.`);
      project.files.projectMilestones = projectMilestones;
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { prev } = this.props;
    const { creationStatus, milestonesErrors } = this.state;
    return (
      <div className="StepContent">
        <p className="LabelSteps">Step 2</p>
        <h1>Complete Project Milestones</h1>
        <div className="ProjectDataContainer">
          <h3 className="CreateSubtitle">Projects Milestone Data</h3>
          <DownloadTemplate
            click={this.clickDownloadMilestonesTemplate}
            subtitle="Project's Milestones Template"
            text="Lorem ipsum text description"
          />
          <div className="UploadExcelFiles">
            <DragUploadFile change={this.changeMilestones} />
            <FileVerificationList
              status={creationStatus}
              errors={milestonesErrors}
            />
          </div>
        </div>

        <Button style={{ marginRight: 8 }} onClick={prev}>
          Previous
        </Button>
        <Button type="primary" onClick={this.submitProject}>
          Continue
        </Button>
      </div>
    );
  }
}

export default withUser(Step2);
