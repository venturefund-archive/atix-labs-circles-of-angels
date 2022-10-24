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
import { intersectionBy, unionBy } from 'lodash';
import { useHistory } from 'react-router';
import { message } from 'antd';
import './_style.scss';
import './_explore-projects.scss';
import ProjectBrowser from '../components/organisms/ProjectBrowser/ProjectBrowser';
import { userPropTypes } from '../helpers/proptypes';
import { projectStatuses, SUPPORTER } from '../constants/constants';
import {
  getMyProjects,
  getFollowedProjects,
  getAppliedProjects
} from '../api/userApi';
import { createProject } from '../api/projectApi';

const MyProjects = ({ user }) => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);

  const fetchMyProjects = async () => {
    const response = await getMyProjects();

    if (response.errors || !response.data) {
      message.error('An error occurred while getting the projects');
      return [];
    }

    return response.data;
  };

  const fetchFollowedProjects = async () => {
    try {
      const response = await getFollowedProjects();
      return response
        ? response.map(project => ({ ...project, following: true }))
        : [];
    } catch (error) {
      message.error(error);
    }
  };

  const fetchAppliedProjects = async () => {
    try {
      const response = await getAppliedProjects();
      const { funding, monitoring } = response || {};

      const uniqueApplied = unionBy(funding, monitoring, 'id');

      const appliedProjects = uniqueApplied.map(project => ({
        ...project,
        applied: true
      }));

      return appliedProjects;
    } catch (error) {
      message.error(error);
    }
  };

  const goToProjectDetail = project => {
    const state = { projectId: project.id };
    const { status } = project;
    if (
      status === projectStatuses.NEW ||
      (status === projectStatuses.REJECTED && user.role !== SUPPORTER)
    ) {
      history.push(`/create-project?id=${project.id}`, state);
    } else {
      history.push(`/project-detail?id=${project.id}`, state);
    }
  };

  const goToProjectProgress = () => {
    // TODO: go to project-progress page
  };

  const _goToNewProject = () => history.push('/create-project');
  const goToNewProject = async () => {
    console.log('Doing my stuff')
    const { projectId } = await createProject()
    console.log(projectId)
    history.push(`/project/edit/${projectId}`)
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const myProjects = await fetchMyProjects();
      const followedProjects = await fetchFollowedProjects();
      const appliedProjects = await fetchAppliedProjects();

      const followedAndAppliedProjects = intersectionBy(
        followedProjects,
        appliedProjects,
        'id'
      ).map(project => ({ ...project, applied: true }));

      const uniqueProjects = unionBy(
        followedAndAppliedProjects,
        followedProjects,
        appliedProjects,
        myProjects,
        'id'
      );

      // TODO analize if is all projects will be together
      setProjects(uniqueProjects);
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
