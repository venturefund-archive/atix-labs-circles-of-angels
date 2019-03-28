import React, { Component } from 'react';
import { Icon, message } from 'antd';
import Link from 'next/link';
import { values, isEmpty } from 'lodash';
import { withUser } from '../components/utils/UserContext';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsProject from '../components/molecules/StepsProject/StepsProjects';
import UploadImage from '../components/molecules/UploadImage/UploadImage';
import UploadFile from '../components/molecules/UploadFile/UploadFile';
import WebFormProject from '../components/molecules/WebFormProject/WebFormProject';
import ButtonPrimary from '../components/atoms/ButtonPrimary/ButtonPrimary';
import ButtonCancel from '../components/atoms/ButtonCancel/ButtonCancel';
import DownloadTemplate from '../components/molecules/DownloadTemplate/DownloadTemplate';
import DragUploadFile from '../components/molecules/DragUploadFile/DragUploadFile';
import FileUploadStatus from '../constants/FileUploadStatus';
import { createProject, downloadMilestonesTemplate } from '../api/projectApi';

import Routing from '../components/utils/Routes';

import './_style.scss';
import './_create-project.scss';

class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.projectName = '';

    this.state = {
      currentStep: 0,
      projectProposal: {},
      projectCoverPhoto: {},
      projectCardPhoto: {},
      projectMilestones: {},
      project: {
        projectName: '',
        mission: '',
        problemAddressed: '',
        location: '',
        timeframe: '',
        goalAmount: '',
        faqLink: ''
      },
      creationStatus: 1, // 1: Pending, 0: Error
      milestonesErrors: []
    };
  }

  handleChange = project => {
    this.setState({ project });
  };

  changeProjectCover = info => {
    const { status } = info.file;
    const projectCoverPhoto = info.file;
    if (status !== FileUploadStatus.UPLOADING) {
      console.log(info.file, info.fileList);
    }
    if (status === FileUploadStatus.DONE) {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ projectCoverPhoto });
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  changeProjectCard = info => {
    const { status } = info.file;
    const projectCardPhoto = info.file;
    if (status !== FileUploadStatus.UPLOADING) {
      console.log(info.file, info.fileList);
    }
    if (status === FileUploadStatus.DONE) {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ projectCardPhoto });
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  changeProjectProposal = info => {
    const { status } = info.file;
    const projectProposal = info.file;
    if (status !== FileUploadStatus.UPLOADING) {
      console.log(info.file, info.fileList);
    }
    if (status === FileUploadStatus.DONE) {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ projectProposal });
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  changeMilestones = info => {
    const { status } = info.file;
    const projectMilestones = info.file;
    if (status !== FileUploadStatus.UPLOADING) {
      console.log(info.file, info.fileList);
    }
    if (status === FileUploadStatus.DONE) {
      message.success(`${info.file.name} file uploaded successfully.`);
      this.setState({ projectMilestones });
    } else if (status === FileUploadStatus.ERROR) {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  previousStep = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep - 1 });
  };

  nextStep = () => {
    const {
      currentStep,
      projectProposal,
      projectCoverPhoto,
      projectCardPhoto,
      projectMilestones,
      project
    } = this.state;
    let allowContinue = true;

    console.log(values(project));

    if (currentStep === 0) {
      if (
        !projectProposal ||
        !projectCoverPhoto ||
        !projectCardPhoto ||
        isEmpty(projectProposal) ||
        isEmpty(projectCoverPhoto) ||
        isEmpty(projectCardPhoto) ||
        !project ||
        this.customIsEmpty(project)
      ) {
        allowContinue = false;
      }

      this.setState({ creationStatus: 1, milestonesErrors: [] });
    }

    if (currentStep === 1) {
      if (!projectMilestones || projectMilestones === {}) {
        allowContinue = false;
      }
    }

    if (allowContinue) {
      this.setState({ currentStep: currentStep + 1 });
    }
  };

  submitProject = async () => {
    const {
      projectProposal,
      projectCoverPhoto,
      projectCardPhoto,
      projectMilestones,
      project
    } = this.state;

    const { user } = this.props;

    const ownerId = user.id;

    const files = [];
    files.push(projectProposal.originFileObj);
    files.push(projectCoverPhoto.originFileObj);
    files.push(projectCardPhoto.originFileObj);
    files.push(projectMilestones.originFileObj);

    const newProject = {
      ...project,
      goalAmount: parseFloat(project.goalAmount)
    };

    const res = await createProject(newProject, files, ownerId);

    console.log(res);
    if (res.status === 200) {
      this.nextStep();
    } else if (res.error.response.data.error) {
      alert(res.error.response.data.error);
      this.setState({ creationStatus: 0 });
    } else if (res.error.response.data.errors) {
      this.setState({ milestonesErrors: res.error.response.data.errors });
      this.setState({ creationStatus: 0 });
    }
  };

  clickDownloadMilestonesTemplate = async () => {
    const res = await downloadMilestonesTemplate();
    console.log(res);
    return res;
  };

  getCurrentStep = () => {
    const { currentStep, creationStatus, milestonesErrors } = this.state;

    const step1 = (
      <span>
        <div className="StepContent">
          <h1>Create New Project</h1>
          <StepsProject stepNumber={0} />
          <div className="ProjectImagesContainer">
            <h1 className="CreateSubtitle">Project's Images</h1>
            <UploadImage
              subtitle="Project's Card Image"
              text="Lorem ipsum text description"
              name="projectCard"
              change={this.changeProjectCard}
            />
            <UploadImage
              subtitle="Project's Cover Image"
              text="Lorem ipsum text description"
              name="projectCover"
              change={this.changeProjectCover}
            />
            <UploadFile
              subtitle="Pitch Proposal Document"
              text="Lorem ipsum text description"
              name="projectProposal"
              change={this.changeProjectProposal}
              buttonText="Upload File"
            />
          </div>
          <div className="ProjectDataContainer">
            <h1 className="CreateSubtitle">Project's Details</h1>
            <WebFormProject
              onConfirm={async project => {
                await this.setState({ project });
                this.nextStep();
              }}
              onCancel={Routing.toExploreProjects}
            />
          </div>
        </div>
      </span>
    );

    const step2 = (
      <span>
        <div className="StepContent">
          <h1>Create New Project</h1>
          <StepsProject stepNumber={1} />
          <div className="ProjectDataContainer">
            <h1 className="CreateSubtitle">Projects Milestone Data</h1>
            <DownloadTemplate
              subtitle="Project's Milestones Template"
              text="Lorem ipsum text description"
              click={this.clickDownloadMilestonesTemplate}
            />
            <DragUploadFile
              change={this.changeMilestones}
              status={creationStatus}
              errors={milestonesErrors}
            />
          </div>
        </div>
        <div className="ControlSteps">
          <ButtonCancel text="Cancel" onClick={this.previousStep} />
          <ButtonPrimary
            text="Create Milestones"
            onClick={this.submitProject}
          />
        </div>
      </span>
    );

    const step3 = (
      <span>
        <h1>Create New Project</h1>
        <StepsProject stepNumber={2} />
        <div className="ProjectStep3Container">
          <Icon
            type="check-circle"
            theme="twoTone"
            twoToneColor="#15D380"
            className="IconSuccess"
          />
          <h1>Your Project has been created successfully!</h1>
          <h2>You can access to it from "My Projects"</h2>

          <Link href="/explore-projects">
            <ButtonPrimary text="Got it" />
          </Link>
        </div>
      </span>
    );

    switch (currentStep) {
      case 0:
        return step1;
      case 1:
        return step2;
      case 2:
        return step3;
      default:
        return step1;
    }
  };

  customIsEmpty(obj) {
    let empty = false;

    Object.values(obj).forEach(v => {
      if (v === 0) {
        empty = true;
        return empty;
      }
      if (isEmpty(String(v))) {
        empty = true;
        return empty;
      }
    });

    return empty;
  }

  render() {
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="CreateProjectContainer">{this.getCurrentStep()}</div>
        </div>
      </div>
    );
  }
}
export default withUser(CreateProject);
