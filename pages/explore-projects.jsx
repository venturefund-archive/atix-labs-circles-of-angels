/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useGetPublicProjects } from '../api/projectApi';
import ProjectBrowser from '../components/organisms/ProjectBrowser/ProjectBrowser';
import Roles from '../constants/RolesMap';

export default function ExploreProjects({ user }) {
  const history = useHistory();
  const [projects] = useGetPublicProjects();

  const goToProjectDetail = project => {
    const state = { projectId: project.id };
    if (project.status === 'new') {
      // location.
      history.push(`/create-project?id=${project.id}`, state);
      // return <Redirect</Redirect>
    } else {
      history.push(`/project-detail?id=${project.id}`, state);
    }
  };

  const goToProjectProgress = () => {
    // Routing.toProjectProgress({ projectId });
  };

  const getTitle = () => {
    if (user && user.role === Roles.PROJECT_SUPPORTER)
      return 'Explore Projects You Can Support';
    return 'Explore Projects';
  };

  return (
    <ProjectBrowser
      title={getTitle()}
      projects={projects}
      onCardClick={goToProjectDetail}
      onTagClick={goToProjectProgress}
    />
  );
}

ExploreProjects.propTypes = {
  user: PropTypes.element.isRequired
};
