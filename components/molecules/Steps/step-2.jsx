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
      creationStatus: false,
      milestonesErrors: [],
      uploadDisable: false,
      verifying: false
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
    } else if (res.error.response.data.error) {
      alert(res.error.response.data.error);
      this.setState({ creationStatus: false });
    } else if (res.error.response.data.errors) {
      this.setState({
        milestonesErrors: res.error.response.data.errors,
        creationStatus: false,
        uploadDisable: true,
        verifying: false
      });
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
      this.setState({ uploadDisable: true, creationStatus: true });
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  verifyingFile = () => {
    this.setState({
      uploadDisable: true,
      verifying: true,
      creationStatus: false
    });
  };

  enabledUpload = () => {
    const { project } = this.props;
    project.files.projectMilestones = [];
    this.setState({
      milestonesErrors: [],
      creationStatus: false,
      uploadDisable: false
    });
  };

  render() {
    const { prev } = this.props;
    const {
      creationStatus,
      milestonesErrors,
      uploadDisable,
      verifying
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
              text="Lorem ipsum text description"
            />
            <div className="UploadExcelFiles">
              <DragUploadFile
                change={this.changeMilestones}
                text="Complete Excel and upload to create Milestones"
                description="Click or drag your Excel file here"
                remove={this.enabledUpload}
                disabled={uploadDisable}
                showUploadList={{ showRemoveIcon: !verifying }}
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
