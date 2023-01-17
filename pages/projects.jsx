/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import './_style.scss';
import './_explore-projects.scss';
import { isMobile } from 'react-device-detect';
import { PROJECT_STATUS_ENUM } from 'model/projectStatus';
import BackOfficeLayout from 'components/Layouts/BackOfficeLayout/BackOfficeLayout';
import ProjectBrowser from '../components/organisms/ProjectBrowser/ProjectBrowser';
import { userPropTypes } from '../helpers/proptypes';
import { createProject, getProjects } from '../api/projectApi';
import ModalMyProjects from '../components/organisms/ModalMyProjects/ModalMyProjects';
import { UserContext } from '../components/utils/UserContext';

const MyProjects = ({ user }) => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  // TODO: this has to be changed
  const [visible, setVisible] = useState(!user.seenModal && isMobile);

  const context = useContext(UserContext);
  const { setSeenUserModal } = context || { setSeenUserModal: () => {} };

  const goToProjectDetail = project => {
    const state = { projectId: project?.id };
    let projectId = project.parent || project.id;
    if (project.status === PROJECT_STATUS_ENUM.IN_REVIEW) {
      projectId = project.id;
    }
    history.push(`/back-office/project/edit/${projectId}`, state);
  };

  const goToProjectProgress = () => {
    // TODO: go to project-progress page
  };

  const goToNewProject = async () => {
    const { projectId } = await createProject();
    history.push(`/back-office/project/edit/${projectId}`);
  };

  const onClick = () => {
    setSeenUserModal();
    setVisible(false);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const myProjects = await getProjects();
      setProjects(myProjects);
    };

    fetchProjects();
  }, []);

  return (
    <BackOfficeLayout user={user}>
      <ProjectBrowser
        title="My Projects"
        userRole={user && user.role}
        projects={projects}
        onCardClick={goToProjectDetail}
        onTagClick={goToProjectProgress}
        onNewProject={goToNewProject}
      />
      <ModalMyProjects isVisible={visible} onClick={onClick} />
    </BackOfficeLayout>
  );
};

MyProjects.propTypes = {
  user: PropTypes.shape(userPropTypes).isRequired
};

export default MyProjects;
