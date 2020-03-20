/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { useHistory } from 'react-router';
import { useGetPublicProjects } from '../api/projectApi';
import './_style.scss';
import './_explore-projects.scss';
import ProjectBrowser from '../components/organisms/ProjectBrowser/ProjectBrowser';

export default function ExploreProjects() {
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

  const goToProjectProgress = projectId => {
    // Routing.toProjectProgress({ projectId });
  };

  return (
    <ProjectBrowser
      title="Explore Projects You Can Support"
      projects={projects}
      onCardClick={goToProjectDetail}
      onTagClick={goToProjectProgress}
    />
  );
}
