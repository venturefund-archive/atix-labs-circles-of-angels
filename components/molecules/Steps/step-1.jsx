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
          <p className="LabelSteps">Step 1</p>
          <h1>Complete Project Detail</h1>
          <div className="ProjectDataContainer">
            <h3 className="CreateSubtitle">Project's Details</h3>
            <WebFormProject project={project} webform={webform} />
          </div>
          <div className="ProjectImagesContainer">
            <h3 className="CreateSubtitle">Project's Images</h3>
            <BlockUpload
              subtitle="Project's Card Image"
              text="Lorem ipsum text description"
              name="projectCard"
              typeAccepts="image/*"
              buttonText="Upload Image"
              change={info =>
                changeProjectFile(project, 'projectCardPhoto', info)
              }
            />
            <BlockUpload
              subtitle="Project's Cover Image"
              text="Lorem ipsum text description"
              name="projectCover"
              typeAccepts="image/*"
              buttonText="Upload Image"
              change={info =>
                changeProjectFile(project, 'projectCoverPhoto', info)
              }
            />
            <BlockUpload
              subtitle="Pitch Proposal Document"
              text="Lorem ipsum text description"
              name="projectProposal"
              typeAccepts=".pdf"
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
