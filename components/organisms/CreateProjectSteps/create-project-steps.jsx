import React from 'react';
import { Steps, Button, message } from 'antd';

import Step1 from '../../molecules/Steps/step-1';
import Step2 from '../../molecules/Steps/step-2';
import Step3 from '../../molecules/Steps/step-3';

import './_create-project.scss';

const Step = Steps.Step;

const steps = [
  {
    title: 'Project Detail',
    content: <Step1 />
  },
  {
    title: 'Project Milestones',
    content: <Step2 />
  },
  {
    title: 'Almost Ready',
    content: <Step3 />
  }
];

class CreateProjectSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div className="CreateProjectContainer">
        <Steps size="small" current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="ContentSteps">{steps[current].content}</div>
        <div className="ControlSteps">
          {current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Continue
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              Got it!
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default CreateProjectSteps;
