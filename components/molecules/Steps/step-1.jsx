import React from 'react';
import { Button } from 'antd';
import BlockUpload from '../BlockUpload/BlockUpload';
import WebFormProject from '../WebFormProject/WebFormProject';

import './_style.scss';

const webform = {
  form: {}
};

class Step1 extends React.Component {
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
    const { project, changeProjectFile } = this.props;

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
              text="This will allow funders to identify your project in the discovery phase"
              name="projectCard"
              typeAccepts="image/*"
              buttonText="Upload Image"
              change={info =>
                changeProjectFile(project, 'projectCardPhoto', info)
              }
            />
            <BlockUpload
              subtitle="Project's Cover Image"
              text="This will be a cover image for your project summary"
              name="projectCover"
              typeAccepts="image/*"
              buttonText="Upload Image"
              change={info =>
                changeProjectFile(project, 'projectCoverPhoto', info)
              }
            />
            <BlockUpload
              subtitle="Project Proposal"
              text="Please download the pitch proposal document and update in-depth description of the project. This form will take between 20mins to 60mins for you to fill in"
              name="projectProposal"
              typeAccepts=".pdf, .ppt, .docx, .doc"
              buttonText="Upload File"
              change={info =>
                changeProjectFile(project, 'projectProposal', info)
              }
            />
            <BlockUpload
              subtitle="Project Agreement"
              text="Lorem ipsum text description"
              name="projectAgreement"
              typeAccepts="*"
              buttonText="Upload File"
              change={info =>
                changeProjectFile(project, 'projectAgreement', info)
              }
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
