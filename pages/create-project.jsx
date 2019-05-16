import React from 'react';

import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CreateProjectSteps from '../components/organisms/CreateProjectSteps/create-project-steps';
import { withUser } from '../components/utils/UserContext';

import './_style.scss';

const CreateProject = () => {
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

  return (
    <div className="AppContainer">
      <SideBar />
      <div className="MainContent">
        <Header />
        <CreateProjectSteps project={project} />
      </div>
    </div>
  );
};

export default withUser(CreateProject);
