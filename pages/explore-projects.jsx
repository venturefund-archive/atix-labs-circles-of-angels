/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Divider } from 'antd';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CardProject from '../components/molecules/CardProject/CardProject';
import {
  getActiveProjects,
  getProjectsAsOracle,
  getProjectMilestones
} from '../api/projectApi';
import { getPhoto } from '../api/photoApi';
import { withUser } from '../components/utils/UserContext';
import Routing from '../components/utils/Routes';
import './_style.scss';
import './_explore-projects.scss';
import Roles from '../constants/RolesMap';
import projectStatus from '../constants/ProjectStatus';
import milestoneActivityStatus from '../constants/MilestoneActivityStatus';

class ExploreProjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOracleProjects: [],
      projects: []
    };
  }

  async componentDidMount() {
    const res = await getActiveProjects();
    const projectsWithoutPhoto = res.data;
    const projects = await Promise.all(
      projectsWithoutPhoto.map(async project => {
        const projectCardPhoto = await getPhoto(project.cardPhoto);
        const milestones = await getProjectMilestones(project.id);
        return {
          ...project,
          cardPhoto: projectCardPhoto.data,
          milestones: milestones.data
        };
      })
    );
    const { user } = this.props;
    const { activeOracleProjects } = this.state;
    if (user.role.id === Roles.Oracle) {
      const response = await getProjectsAsOracle(user.id);
      const oracleProjects = response.data.projects;
      const activeProjects = await projects.map(project => project.id);

      const oracleProjectsActive = oracleProjects.filter(
        project => activeProjects.indexOf(project) !== -1
      );

      this.setState({ activeOracleProjects: oracleProjectsActive });
    }
    this.setState({ projects });
  }

  getMilestoneProgress(milestones) {
    let completedMilestones = 0;
    milestones.forEach(milestone => {
      if (milestone.status.status === milestoneActivityStatus.COMPLETED) {
        completedMilestones++;
      }
    });
    return (completedMilestones * 100) / milestones.length;
  }

  goToProjectDetail(projectId) {
    Routing.toProjectDetail({ projectId });
  }

  goToProjectProgress(projectId) {
    Routing.toProjectProgress({ projectId });
  }

  render() {
    const { activeOracleProjects, projects } = this.state;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />

          <div className="Content">
            <div className="titlepage">
              <h1>Explore Projects</h1>
            </div>
            <div className="ProjectsCardsContainer">
              {projects &&
                projects.map(project => {
                  const showTag =
                    project.status === projectStatus.IN_PROGRESS &&
                    activeOracleProjects.indexOf(project.id) !== -1;
                  return (
                    <CardProject
                      enterpriseName={project.projectName}
                      projectCardImage={project.cardPhoto}
                      enterpriseLocation={project.location}
                      timeframe={project.timeframe}
                      amount={project.goalAmount}
                      showTag={showTag}
                      tagClick={() => this.goToProjectProgress(project.id)}
                      milestoneProgress={this.getMilestoneProgress(
                        project.milestones
                      )}
                      key={project.id}
                      onClick={() => this.goToProjectDetail(project.id)}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(ExploreProjects);
