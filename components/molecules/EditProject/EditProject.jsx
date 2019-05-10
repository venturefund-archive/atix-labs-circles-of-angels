import React from 'react';
import { Button } from 'antd';
import BlockUpload from '../BlockUpload/BlockUpload';
import WebFormProject from '../WebFormProject/WebFormProject';
import '../../../pages/_steps.scss';
import './_style.scss';

const webform = {
  form: {}
};

class EditProject extends React.Component {
  constructor(props) {
    super(props);

    const { project } = props;
    this.state = {
      previewCardPhoto: project.files.cardPhoto,
      previewCoverPhoto: project.files.coverPhoto,
      projectCardPhoto: {},
      projectCoverPhoto: {}
    };
  }

  validProject = () => {
    const { project, onSubmit } = this.props;
    const { projectCardPhoto, projectCoverPhoto } = this.state;
    webform.form.validateFields();
    const valid = Boolean(
      project.data.projectName &&
        project.data.mission &&
        project.data.goalAmount &&
        project.data.problemAddressed &&
        project.data.location &&
        project.data.timeframe
    );
    if (valid) onSubmit(project, projectCoverPhoto, projectCardPhoto);
  };

  render() {
    const { project, onBack } = this.props;
    const { previewCardPhoto, previewCoverPhoto } = this.state;

    return (
      <div className="StepContent">
        <div className="DataSteps">
          <div className="StepDescription">
            <p className="LabelSteps">Edit Project</p>
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
                this.setState({
                  previewCardPhoto: URL.createObjectURL(
                    info.file.originFileObj
                  ),
                  projectCardPhoto: info.file.originFileObj
                })
              }
            />
            <div className="ProjectPhotos">
              <img src={previewCardPhoto} alt="projectCardImage" />
            </div>

            <BlockUpload
              subtitle="Project's Cover Image"
              text="This will be a cover image for your project summary.
              Image Size: 1400x400 "
              name="projectCover"
              typeAccepts="image/*"
              buttonText="Upload Image"
              change={info =>
                this.setState({
                  previewCoverPhoto: URL.createObjectURL(
                    info.file.originFileObj
                  ),
                  projectCoverPhoto: info.file.originFileObj
                })
              }
            />

            <div className="ProjectPhotos">
              <img src={previewCoverPhoto} alt="projectCoverImage" />
            </div>
          </div>
        </div>
        <div className="ControlSteps StepOne">
          <Button style={{ marginRight: 8 }} onClick={onBack}>
            Back
          </Button>
          <Button type="primary" onClick={this.validProject}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default EditProject;
