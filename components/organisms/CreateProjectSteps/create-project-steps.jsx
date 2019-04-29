import React from 'react';
import { Steps, message } from 'antd';
import Step1 from '../../molecules/Steps/step-1';
import Step2 from '../../molecules/Steps/step-2';
import Step3 from '../../molecules/Steps/step-3';
import FileUploadStatus from '../../../constants/FileUploadStatus';

import './_create-project.scss';

const { Step } = Steps;

const changeProjectFile = (project, key, file) => {
  const { status } = file;
  if (status === FileUploadStatus.DONE) {
    message.success(`${file.name} file uploaded successfully`);
    project.files[key] = file;
  } else if (status === FileUploadStatus.ERROR) {
    message.error(`${file.name} file upload failed.`);
  } else if (status === FileUploadStatus.REMOVED) {
    project.files[key] = {};
  }
};

class CreateProjectSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      hiddenButtons: {
        hideButtonCard: false,
        hideButtonCover: false,
        hideButtonProposal: false,
        hideButtonAgreement: false
      }
    };
  }

  hideButton = button => {
    const { hiddenButtons } = this.state;
    hiddenButtons[button] = true;
    this.setState({ hiddenButtons });
  };

  showButton = button => {
    const { hiddenButtons } = this.state;
    hiddenButtons[button] = false;
    this.setState({ hiddenButtons });
  };

  next = () => {
    const { current } = this.state;
    this.setState({ current: current + 1 });
  };

  prev = () => {
    const { current } = this.state;
    this.setState({ current: current - 1 });
  };

  render() {
    const { project } = this.props;
    const { current, hiddenButtons } = this.state;
    this.steps = [
      {
        title: 'Project Details',
        content: (
          <Step1
            project={project}
            next={this.next}
            changeProjectFile={changeProjectFile}
            hiddenButtons={hiddenButtons}
            showButton={this.showButton}
            hideButton={this.hideButton}
          />
        )
      },
      {
        title: 'Project Milestones',
        content: (
          <Step2
            project={project}
            next={this.next}
            prev={this.prev}
            changeProjectFile={this.changeProjectFile}
          />
        )
      },
      {
        title: 'Project completed',
        content: <Step3 />
      }
    ];

    return (
      <div className="CreateProjectContainer">
        <div className="StepsContainer">
          <Steps current={current}>
            {this.steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </div>
        {this.steps[current].content}
      </div>
    );
  }
}

export default CreateProjectSteps;
