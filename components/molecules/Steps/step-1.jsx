import React from 'react';
import { Button, message } from 'antd';
import { isEmpty } from 'lodash';
import mime from 'mime-types';
import BlockUpload from '../BlockUpload/BlockUpload';
import WebFormProject from '../WebFormProject/WebFormProject';
import DownloadTemplate from '../DownloadTemplate/DownloadTemplate';
import { downloadProposalTemplate } from '../../../api/projectApi';

import './_style.scss';
import { showModalError } from '../../utils/Modals';

const webform = {
  form: {}
};

const getValidFile = file => {
  return !isEmpty(file) ? [file] : false;
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectProposal: [],
      projectAgreement: [],
      projectCardPhoto: [],
      projectCoverPhoto: []
    };
  }

  verifyFileType = async (project, projectFile, info) => {
    const { changeProjectFile, hideButton } = this.props;
    if (info && info.file) {
      const fileType = mime.lookup(info.file.name);

      if (projectFile === 'projectCardPhoto') {
        if (fileType.includes('image/')) {
          this.setState({ projectCardPhoto: [info.file] });
          hideButton('hideButtonCard');
          return changeProjectFile(project, projectFile, info.file);
        }
      }

      if (projectFile === 'projectCoverPhoto') {
        if (fileType.includes('image/')) {
          this.setState({ projectCoverPhoto: [info.file] });
          hideButton('hideButtonCover');
          return changeProjectFile(project, projectFile, info.file);
        }
      }

      if (projectFile === 'projectAgreement') {
        if (
          fileType === 'application/msword' ||
          fileType ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          fileType === 'application/pdf'
        ) {
          this.setState({ projectAgreement: [info.file] });
          hideButton('hideButtonAgreement');
          return changeProjectFile(project, projectFile, info.file);
        }
      }

      if (projectFile === 'projectProposal') {
        if (
          fileType === 'application/msword' ||
          fileType ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          fileType === 'application/pdf' ||
          fileType === 'application/vnd.ms-powerpoint' ||
          fileType ===
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ) {
          this.setState({ projectProposal: [info.file] });
          hideButton('hideButtonProposal');
          return changeProjectFile(project, projectFile, info.file);
        }
      }

      message.error(`${info.file.name} file type is invalid`);
    }
  };

  removeFromFilelist = (projectFile, info) => {
    const { showButton, changeProjectFile, project } = this.props;
    if (projectFile === 'projectCardPhoto') {
      this.setState({ projectCardPhoto: [] });
      showButton('hideButtonCard');
    }

    if (projectFile === 'projectCoverPhoto') {
      this.setState({ projectCoverPhoto: [] });
      showButton('hideButtonCover');
    }

    if (projectFile === 'projectAgreement') {
      this.setState({ projectAgreement: [] });
      showButton('hideButtonAgreement');
    }

    if (projectFile === 'projectProposal') {
      this.setState({ projectProposal: [] });
      showButton('hideButtonProposal');
    }

    return changeProjectFile(project, projectFile, info);
  };

  clickDownloadProposalTemplate = async () => {
    const res = await downloadProposalTemplate();
    if (res.error) {
      console.log(res);
      const { error } = res;
      const title = 'Proposal template download failed';
      const content = error.response
        ? 'Could not download project proposal template. Please try again later.'
        : error.message;
      showModalError(title, content);
    }
    return res;
  };

  validProject = () => {
    const { project, next } = this.props;
    webform.form.validateFields();
    const valid = Boolean(
      project.data.projectName &&
        project.data.mission &&
        project.data.goalAmount &&
        project.data.problemAddressed &&
        project.data.location &&
        project.data.timeframe &&
        project.data.faqLink &&
        project.files.projectProposal.response === 'ok' &&
        project.files.projectCoverPhoto.response === 'ok' &&
        project.files.projectCardPhoto.response === 'ok' &&
        project.files.projectAgreement.response === 'ok'
    );
    if (valid) next();
  };

  render() {
    const {
      project,
      changeProjectFile,
      hiddenButtons,
      hideButton,
      showButton
    } = this.props;

    const {
      projectProposal,
      projectAgreement,
      projectCardPhoto,
      projectCoverPhoto
    } = this.state;

    return (
      <div className="StepContent">
        <div className="DataSteps">
          <div className="StepDescription">
            <p className="LabelSteps">Step 1</p>
            <h3>Complete Project Details</h3>
          </div>
          <div className="ProjectDataContainer">
            <h3 className="CreateSubtitle">Project's Details</h3>
            <WebFormProject project={project} webform={webform} />
          </div>
          <div className="ProjectImagesContainer">
            <h3 className="CreateSubtitle">Project's Files</h3>
            <BlockUpload
              subtitle="Project Thumbnail Image"
              text="This will allow funders to identify your project in the discovery phase
              Image Size: 700x400"
              name="projectCard"
              typeAccepts="image/*"
              buttonText="Upload Image"
              change={info =>
                this.verifyFileType(project, 'projectCardPhoto', info)
              }
              fileList={projectCardPhoto}
              defaultFileList={getValidFile(project.files.projectCardPhoto)}
              hideButton={hiddenButtons.hideButtonCard}
              remove={info => this.removeFromFilelist('projectCardPhoto', info)}
            />
            <BlockUpload
              subtitle="Project's Cover Image"
              text="This will be a cover image for your project summary.
              Image Size: 1400x400 "
              name="projectCover"
              typeAccepts="image/*"
              buttonText="Upload Image"
              change={info =>
                this.verifyFileType(project, 'projectCoverPhoto', info)
              }
              fileList={projectCoverPhoto}
              defaultFileList={getValidFile(project.files.projectCoverPhoto)}
              hideButton={hiddenButtons.hideButtonCover}
              remove={info =>
                this.removeFromFilelist('projectCoverPhoto', info)
              }
            />
            <BlockUpload
              subtitle="Project Proposal"
              text="Please download the pitch proposal document and update in-depth description of the project. This form will take between 20mins to 60mins for you to fill in"
              name="projectProposal"
              typeAccepts=".pdf, .ppt, .docx, .doc"
              buttonText="Upload Project Proposal"
              change={info =>
                this.verifyFileType(project, 'projectProposal', info)
              }
              fileList={projectProposal}
              defaultFileList={getValidFile(project.files.projectProposal)}
              hideButton={hiddenButtons.hideButtonProposal}
              remove={info => this.removeFromFilelist('projectProposal', info)}
            />
            <DownloadTemplate
              click={this.clickDownloadProposalTemplate}
              text="Download Project Proposal"
            />
            <BlockUpload
              subtitle="Project Agreement"
              text="Lorem ipsum text description"
              name="projectAgreement"
              typeAccepts=".pdf, .docx, .doc"
              buttonText="Upload File"
              change={info =>
                this.verifyFileType(project, 'projectAgreement', info)
              }
              fileList={projectAgreement}
              defaultFileList={getValidFile(project.files.projectAgreement)}
              hideButton={hiddenButtons.hideButtonAgreement}
              remove={info => this.removeFromFilelist('projectAgreement', info)}
            />
          </div>
        </div>
        <div className="ControlSteps StepOne">
          <Button type="primary" onClick={this.validProject}>
            Continue
          </Button>
        </div>
      </div>
    );
  }
}

export default Step1;
