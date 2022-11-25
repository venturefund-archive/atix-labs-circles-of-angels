/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import './_style.scss';
import './_explore-projects.scss';
import ProjectBrowser from '../components/organisms/ProjectBrowser/ProjectBrowser';
import { userPropTypes } from '../helpers/proptypes';
import { projectStatuses, SUPPORTER } from '../constants/constants';
import { createProject, getProjects } from '../api/projectApi';

const MyProjects = ({ user }) => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);

  const goToProjectDetail = (project) => {
    const state = { projectId: project?.id };
    history.push(`/project/edit/${project.id}`, state);
  };

  const goToProjectProgress = () => {
    // TODO: go to project-progress page
  };

  const goToNewProject = async () => {
    const { projectId } = await createProject();
    history.push(`/project/edit/${projectId}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const myProjects = await getProjects();
      setProjects(myProjects);
    };

    fetchProjects();
  }, []);

  return (
    <ProjectBrowser
      title="My Projects"
      userRole={user && user.role}
      projects={projects}
      onCardClick={goToProjectDetail}
      onTagClick={goToProjectProgress}
      onNewProject={goToNewProject}
    />
  );
};

MyProjects.propTypes = {
  user: PropTypes.shape(userPropTypes).isRequired
};

export default MyProjects;
