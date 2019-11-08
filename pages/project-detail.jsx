/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Tabs } from 'antd';
import { showModalError } from '../components/utils/Modals';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import { withUser } from '../components/utils/UserContext';
import './_style.scss';
import './_steps.scss';
import './_project-detail.scss';
import ProjectMission from '../components/molecules/ProjectMission/ProjectMission';
import GeneralItem from '../components/atoms/GeneralItem/GeneralItem';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import {
  getProject,
  getProjectExperiences,
  getProjectMilestones,
  createProjectExperience
} from '../api/projectApi';
import { createUserProject } from '../api/userProjectApi';
import { getPhoto } from '../api/photoApi';
import Routing from '../components/utils/Routes';
import ProjectStatus from '../constants/ProjectStatus';
import Roles from '../constants/RolesMap';
import SeccionExperience from './experiences';

const { TabPane } = Tabs;

function callback(key) {}

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectDetail: {},
      projectExperiences: [],
      milestones: []
    };
  }

  static async getInitialProps(query) {
    const { projectId } = query.query;
    return { projectId };
  }

  componentDidMount = async () => {
    const { projectId } = this.props;
    // const projectDetail = (await getProject(projectId)).data;
    // const milestones = (await getProjectMilestones(projectId)).data;
    // const sortedMilestones = milestones.sort((a, b) => a.id - b.id);
    // const projectExperiences = await this.getExperiences();
    const projectDetail = {
      projectName: 'El Buen Proyecto',
      location: 'Somewhere over the rainbow',
      timeframe: '1 sprint',
      goalAmount: '1 sueldo minimo vital y movil',
      milestoneProgress: [],
      mission: 'Terminar COA',
      problemAddressed: 'El problema de Irlanda son los irlandeses.',
      status: 1
    };
    const projectExperiences = [];
    const milestones = [];
    this.setState({
      projectDetail,
      projectExperiences,
      milestones
    });
  };

  getExperiences = async () => {
    const { projectId } = this.props;
    const projectExperiences = (await getProjectExperiences(projectId))
      .experiences;

    await projectExperiences.forEach(async experience => {
      const date = new Date(experience.createdAt);
      experience.date = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

      if (experience.photos)
        await experience.photos.forEach(async photo => {
          photo.image = await getPhoto(photo.id);
          this.setState({ projectExperiences });
        });
    });
    return projectExperiences;
  };

  createProjectExperience = async experience => {
    const { projectId, user } = this.props;
    const { comment, photos } = experience;
    const newExperience = {
      comment,
      projectId,
      user: user.id
    };
    const createdExperience = await createProjectExperience(
      newExperience,
      photos
    );
    if (createdExperience.error) {
      console.error(createdExperience.error);
      return;
    }
    const projectExperiences = await this.getExperiences();
    this.setState({ projectExperiences });
  };

  applyToProject = async () => {
    const { projectDetail } = this.state;
    const { user } = this.props;
    const isFunder = user && user.role && user.role.id === Roles.Funder;
    if (isFunder) {
      const response = await createUserProject(user.id, projectDetail.id);

      if (response.error) {
        const { error } = response;
        const title = error.response
          ? `${error.response.status} - ${error.response.statusText}`
          : error.message;
        const content = error.response
          ? error.response.data.error
          : error.message;
        showModalError(title, content);
        return response;
      }
    }

    if (projectDetail.status === ProjectStatus.IN_PROGRESS) {
      Routing.toProjectProgress({
        projectId: projectDetail.id
      });
    } else {
      Routing.toConsensusMilestones({
        projectId: projectDetail.id,
        initialStep: 0
      });
    }
  };

  render() {
    const { projectDetail, projectExperiences, milestones } = this.state;
    const { projectId } = this.props;
    const itemsData = projectDetail
      ? [
          {
            subtitle: 'Country of Impact',
            title: projectDetail.location,
            iconItem: 'environment'
          },
          {
            subtitle: 'Project duration',
            title: projectDetail.timeframe,
            iconItem: 'calendar'
          },
          {
            subtitle: 'Amount',
            title: projectDetail.goalAmount,
            iconItem: 'dollar'
          },
          {
            subtitle: 'Name of Lead',
            title: projectDetail.ownerName,
            iconItem: 'user'
          },
          {
            subtitle: 'Mail of Lead',
            title: projectDetail.ownerEmail,
            iconItem: 'mail'
          }
        ]
      : [];
    return (
      <div className="ContentComplete">
        <div className="ProjectContainer DataSteps">
          <div className="ProjectHeader">
            {/* <img
                  src={`/files/projects/${projectId}/coverPhoto.jpg`}
                  alt="projectCoverImage"
                /> */}
<<<<<<< HEAD
                <img
                  className="Banner"
                  src="./static/images/imgcard.png"
                  alt="Circles of Angels"
                />
                <div className="ProjectEnterprice">
                  <div>
                    <p>Entreprise</p>
                    <h1>{projectDetail ? projectDetail.projectName : ''}</h1>
                  </div>
                  <div className="flex">
                    <GeneralItem
                      img="./static/images/world.svg"
                      info="Cambodia"
                      label="Country of Impact"
                    />
                    <GeneralItem
                      img="./static/images/world.svg"
                      info="Cambodia"
                      label="Country of Impact"
                    />
                    <GeneralItem
                      img="./static/images/world.svg"
                      info="Cambodia"
                      label="Country of Impact"
                    />
                  </div>
                </div>
=======
            <img
              className="Banner"
              src="./static/images/imgcard.png"
              alt="Circles of Angels"
            />
            <div className="ProjectEnterprice">
              <div>
                <p>Entreprise</p>
                <h1>{projectDetail ? projectDetail.projectName : ''}</h1>
>>>>>>> 4d855ab79b40f679eb30c554af1b99b8eebc5d3a
              </div>
              <div className="flex">
                <div
                  img="./static/images/world.svg"
                  info="Cambodia"
                  label="Country of Impact"
                />
                <div
                  img="./static/images/world.svg"
                  info="Cambodia"
                  label="Country of Impact"
                />
                <div
                  img="./static/images/world.svg"
                  info="Cambodia"
                  label="Country of Impact"
                />
              </div>
            </div>
          </div>
          <div className="BlockContent">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="details" key="1">
                <div className="ProjectContent">
                  <ProjectMission
                    mission={projectDetail ? projectDetail.mission : ''}
                    terms={projectDetail ? projectDetail.problemAddressed : ''}
                    startedProject={
                      projectDetail.status === ProjectStatus.IN_PROGRESS
                    }
                    milestones={milestones}
                  />
                  <div className="ProjectGeneralData">
                    <div className="block">
                      <h1 className="title">Generals</h1>
                    </div>

                    {itemsData.map((item, i) => (
                      <GeneralItem
                        subtitle={item.subtitle}
                        title={item.title}
                        iconItem={item.iconItem}
                        key={i}
                      />
                    ))}
                    {/* <h1 className="title">Oracle: Joseph Stewart</h1> */}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Experiences" key="2">
                <SeccionExperience
                  experiences={projectExperiences}
                  onCreate={this.createProjectExperience}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="SubmitProject StepOne">
          <CustomButton
            buttonText="Go to project"
            theme="Success"
            onClick={this.applyToProject}
          />
        </div>
      </div>
    );
  }
}

export default withUser(ProjectDetail);
