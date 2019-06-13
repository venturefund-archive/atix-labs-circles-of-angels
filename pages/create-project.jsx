/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

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
