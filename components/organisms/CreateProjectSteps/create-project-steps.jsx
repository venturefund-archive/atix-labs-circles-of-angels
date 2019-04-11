import React from 'react';
import { Steps, message } from 'antd';

import Step1 from '../../molecules/Steps/step-1';
import Step2 from '../../molecules/Steps/step-2';
import Step3 from '../../molecules/Steps/step-3';
import FileUploadStatus from '../../../constants/FileUploadStatus';

import './_create-project.scss';

const { Step } = Steps;

const changeProjectFile = (project, key, info) => {
  const { status } = info.file;
  const { file } = info;
  if (status === FileUploadStatus.DONE) {
    message.success(`${file.name} file uploaded successfully`);
    project.files[key] = file;
  } else if (status === FileUploadStatus.ERROR) {
    message.error(`${info.file.name} file upload failed.`);
  }
};

class CreateProjectSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    const { project } = this.props;

    this.steps = [
      {
        title: 'Project Detail',
        content: (
          <Step1
            project={project}
            next={this.next}
            changeProjectFile={changeProjectFile}
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
        title: 'Almost Ready',
        content: <Step3 />
      }
    ];
  }

  next = () => {
    const { current } = this.state;
    this.setState({ current: current + 1 });
  };

  prev = () => {
    const { current } = this.state;
    this.setState({ current: current - 1 });
  };

  render() {
    const { current } = this.state;

    return (
      <div className="CreateProjectContainer">
        <Steps size="small" current={current}>
          {this.steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="ContentSteps">{this.steps[current].content}</div>
      </div>
    );
  }
}

export default CreateProjectSteps;
