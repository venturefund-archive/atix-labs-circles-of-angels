/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Button } from 'antd';
import BlockUpload from '../BlockUpload/BlockUpload';
import WebFormProject from '../WebFormProject/WebFormProject';
import DownloadTemplate from '../DownloadTemplate/DownloadTemplate';
import { downloadProposalTemplate } from '../../../api/projectApi';
import '../../../pages/_steps.scss';
import './_style.scss';
import { showModalError } from '../../utils/Modals';
import {
  getBlockUploadProps,
  projectCardPhotoType,
  projectAgreementType,
  projectProposalType,
  projectCoverPhotoType
} from '../../utils/helpers/createProjectStep1Helper';

const webform = {
  form: {}
};

const clickDownloadProposalTemplate = async () => {
  const res = await downloadProposalTemplate();
  if (res.error) {
    const { error } = res;
    const title = 'Proposal template download failed';
    const content = error.response
      ? 'Could not download project proposal template. Please try again later.'
      : error.message;
    showModalError(title, content);
  }
  return res;
};

const validProject = () => {
  const { project, next } = this.props;
  webform.form.validateFields();
  if (
    project.data.projectName &&
    project.data.mission &&
    project.data.goalAmount &&
    project.data.problemAddressed &&
    project.data.location &&
    project.data.timeframe &&
    project.files.projectProposal.response === 'ok' &&
    project.files.projectCoverPhoto.response === 'ok' &&
    project.files.projectCardPhoto.response === 'ok'
  )
    next();
};

const Step1 = ({
  project,
  changeProjectFile,
  hiddenButtons,
  hideButton,
  showButton
}) => {
  const [projectProposal, setProjectProposal] = useState([]);
  const [projectAgreement, setProjectAgreement] = useState([]);
  const [projectCardPhoto, setProjectCardPhoto] = useState([]);
  const [projectCoverPhoto, setProjectCoverPhoto] = useState([]);

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
            {...getBlockUploadProps(projectCardPhotoType)({
              project,
              setProjectCardPhoto,
              isButtonHide: hiddenButtons[projectCardPhotoType],
              hideButton,
              showButton,
              changeProjectFile,
              projectList: projectCardPhoto
            })}
          />

          <DownloadTemplate
            subtitle="Project Proposal - Download"
            text="Please download the pitch proposal document and update in-depth description of the project. This form will take between 20mins to 60mins for you to fill in"
            click={clickDownloadProposalTemplate}
            buttontext="Download Project Proposal Template"
          />

          <BlockUpload
            {...getBlockUploadProps(projectCoverPhotoType)({
              project,
              setProjectCoverPhoto,
              isButtonHide: hiddenButtons[projectCoverPhotoType],
              hideButton,
              showButton,
              changeProjectFile,
              projectList: projectCoverPhoto
            })}
          />
          <BlockUpload
            {...getBlockUploadProps(projectProposalType)({
              project,
              setProjectProposal,
              isButtonHide: hiddenButtons[projectProposalType],
              hideButton,
              showButton,
              changeProjectFile,
              projectList: projectProposal
            })}
          />
          <BlockUpload
            {...getBlockUploadProps(projectAgreementType)({
              project,
              setProjectAgreement,
              isButtonHide: hiddenButtons[projectAgreementType],
              hideButton,
              showButton,
              changeProjectFile,
              projectList: projectAgreement
            })}
          />
        </div>
      </div>
      <div className="ControlSteps StepOne">
        <Button type="primary" onClick={validProject}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Step1;
