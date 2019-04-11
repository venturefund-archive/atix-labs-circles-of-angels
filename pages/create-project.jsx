import React from 'react';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CreateProjectSteps from '../components/organisms/CreateProjectSteps/create-project-steps';

import './_style.scss';

const project = {
  data: {
    faqLink: '',
    goalAmount: '',
    location: '',
    mission: '',
    problemAddressed: '',
    projectName: '',
    timeframe: ''
  },
  files: {
    projectProposal: {},
    projectCoverPhoto: {},
    projectCardPhoto: {},
    projectMilestones: {},
    projectAgreement: {},
    milestonesErrors: []
  }
};

const CreateProject = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <CreateProjectSteps project={project} />
    </div>
  </div>
);

export default CreateProject;
