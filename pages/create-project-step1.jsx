import React, { Component } from 'react';
import { Input, Icon, message } from 'antd';
import Router from 'next/router';
import { values, isEmpty } from 'lodash';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import StepsProject from '../components/molecules/StepsProject/StepsProjects';
import UploadImage from '../components/molecules/UploadImage/UploadImage';
import WebFormProject from '../components/molecules/WebFormProject/WebFormProject';
import ButtonPrimary from '../components/atoms/ButtonPrimary/ButtonPrimary';
import ButtonCancel from '../components/atoms/ButtonCancel/ButtonCancel';
import DownloadTemplate from '../components/molecules/DownloadTemplate/DownloadTemplate';
import DragUploadFile from '../components/molecules/DragUploadFile/DragUploadFile';
import { createProject } from '../api/projectApi';

import './_style.scss';
import './_create-project.scss';

class CreateProject extends Component {
  constructor() {
    super();

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
      }
    };
  }

  handleChange = project => {
    this.setState({ project });
  };

  changeProjectCover = info => {
    const { status } = info.file;
    const projectCoverPhoto = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ projectCoverPhoto });
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  changeProjectCard = info => {
    const { status } = info.file;
    const projectCardPhoto = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ projectCardPhoto });
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  changeProjectProposal = info => {
    const { status } = info.file;
    const projectProposal = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.setState({ projectProposal });
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  changeMilestones = info => {
    const { status } = info.file;
    const projectMilestones = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      this.setState({ projectMilestones });
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
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

    if (currentStep === 0) {
      if (
        !projectProposal ||
        !projectCoverPhoto ||
        !projectCardPhoto ||
        projectProposal === {} ||
        projectCoverPhoto === {} ||
        projectCardPhoto === {} ||
        !project ||
        project === {}
      ) {
        allowContinue = false;
      }
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

    const files = [];
    files.push(projectProposal.originFileObj);
    files.push(projectCoverPhoto.originFileObj);
    files.push(projectCardPhoto.originFileObj);
    files.push(projectMilestones.originFileObj);

    const res = await createProject(project, files);

    console.log(res);
    if (res.status === 200) {
      this.nextStep();
    }
  };

  getCurrentStep = () => {
    const { currentStep } = this.state;

    const step1 = (
      <span>
        <h1>Create New Project</h1>
        <StepsProject />
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
          <UploadImage
            subtitle="Pitch Proposal Template"
            text="Lorem ipsum text description"
            name="projectProposal"
            change={this.changeProjectProposal}
          />
        </div>
        <div className="ProjectDataContainer">
          <h1 className="CreateSubtitle">Project's Details</h1>
          <WebFormProject change={this.handleChange} />
        </div>
        <div className="ControlSteps">
          <ButtonCancel text="Cancel" />
          <ButtonPrimary text="Continue" onClick={this.nextStep} />
        </div>
      </span>
    );

    const step2 = (
      <span>
        <h1>Create New Project</h1>
        <StepsProject />
        <div className="ProjectDataContainer">
          <h1 className="CreateSubtitle">Projects Milestone Data</h1>
          <DownloadTemplate
            subtitle="Project's Detail Template"
            text="Lorem ipsum text description"
          />
          <DragUploadFile change={this.changeMilestones} />
        </div>
        <div className="ControlSteps">
          <ButtonCancel text="Cancel" />
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
        <StepsProject />
        <div className="ProjectStep3Container">
          <Icon
            type="check-circle"
            theme="twoTone"
            twoToneColor="#15D380"
            className="IconSuccess"
          />
          <h1>Your Project has been created successfully!</h1>
          <h2>You can access to it from "My Projects"</h2>
          <ButtonPrimary text="Got it" />
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
export default CreateProject;
