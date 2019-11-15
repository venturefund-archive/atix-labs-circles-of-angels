/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Tabs, Col, Row, Divider, Progress, Badge, Tag } from 'antd';
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
import RowMilestones from '../components/organisms/RowMilestones/RowMilestones';
import {
  getProject,
  getProjectExperiences,
  getProjectMilestones,
  createProjectExperience
} from '../api/projectApi';
import { createUserProject } from '../api/userProjectApi';
import { getPhoto } from '../api/photoApi';
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
      projectName: 'Girls to school',
      location: 'Cambodia',
      timeframe: '12 months',
      goalAmount: '$25,000',
      milestoneProgress: [],
      mission:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt ollit anim id est laborum quis nostrud exercitation ullamco.Laboris nisi ut aliquip ex ea commodo',
      problemAddressed:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt ollit anim id est laborum,quis nostrud exercitation ullamco.Laboris nisi ut aliquip ex ea commodo consequat.Excepteur sint occaecat cupidatat non proident.Excepteur sint occaecat cupidatat nonproident.',
      status: 1
    };
    const photos = [
      { image: { data: './static/images/imgcard.png' } },
      { image: { data: './static/images/imgcard.png' } },
      { image: { data: './static/images/imgcard.png' } },
      { image: { data: './static/images/imgcard.png' } }
    ];
    const experienceMock = {
      photos,
      comment: 'Loremn  ipsum sadda jasdjadjad  ajdjasda',
      date: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
      user: { username: 'Test' }
    };
    const projectExperiences = [experienceMock, experienceMock, experienceMock];
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
            info: 'Country of Impact',
            label: projectDetail.location,
            img: './static/images/world-icon.svg'
          },
          {
            info: 'Timeframe',
            label: projectDetail.timeframe,
            img: './static/images/calendar-icon.svg'
          },
          {
            info: 'Amount',
            label: projectDetail.goalAmount,
            img: './static/images/amount-icon.svg'
          }
          // {
          //   label: 'Name of Lead',
          //   info: projectDetail.ownerName,
          //   img: './static/images/world.svg'
          // },
          // {
          //   label: 'Mail of Lead',
          //   info: projectDetail.ownerEmail,
          //   img: './static/images/world.svg'
          // }
        ]
      : [];

    const experienceTab = (
      <div>
        Experiences
        <Badge
          count={3}
          style={{
            backgroundColor: '#fff',
            color: '#BDBDBD',
            boxShadow: '0 0 0 1px #BDBDBD inset'
          }}
        />
      </div>
    );
    return (
      <div className="ContentComplete">
        <div className="ProjectContainer DataSteps">
          <div className="ProjectHeader">
            {/* <img
                  src={`/files/projects/${projectId}/coverPhoto.jpg`}
                  alt="projectCoverImage"
                /> */}
            <img
              className="Banner"
              src="./static/images/imgcard.png"
              alt="Circles of Angels"
            />
            <div className="ProjectEnterprice">
              <div>
                <p>Organization Name</p>
                <h1>{projectDetail ? projectDetail.projectName : ''}</h1>
              </div>
              <div className="flex">
                {itemsData.map((item, i) => (
                  <GeneralItem
                    label={item.label}
                    info={item.info}
                    img={item.img}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="BlockContent">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="details" key="1">
                <Row className="ProjectContent">
                  <ProjectMission
                    mission={projectDetail ? projectDetail.mission : ''}
                    terms={projectDetail ? projectDetail.problemAddressed : ''}
                    startedProject={
                      projectDetail.status === ProjectStatus.IN_PROGRESS
                    }
                    milestones={milestones}
                  />
                  <Col span={1}>
                    <Divider type="vertical" />
                  </Col>
                  <Col className="ProjectProgress" span={11}>
                    <div className="block">
                      <h1 className="title">Milestones Progress</h1>
                    </div>
                    <Col span={12}>
                      <h4>
                        Project <strong>Started</strong>
                      </h4>
                    </Col>
                    <Col className="txtright" span={6} offset={6}>
                      <h4>
                        Project <strong>Finished!</strong>
                      </h4>
                    </Col>
                    <Col span={1}>
                      <h4>
                        <strong>0%</strong>
                      </h4>
                    </Col>
                    <Col span={21}>
                      <Progress
                        strokeColor="#6FCF97"
                        percent={50}
                        showInfo={false}
                      />
                    </Col>
                    <Col className="txtright" span={2}>
                      <h4>
                        <strong>100%</strong>
                      </h4>
                    </Col>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Milestones" key="3">
                <div className="MilestonesDetails">
                  <RowMilestones
                    ActionMilestones={(
<div className="space-between w100">
  <Tag color="#27AE60">Claimable!</Tag>
  <div style={{ width: 120 }}>
                          <Progress percent={30} />
                        </div>
</div>
)}
                    ActionsActivities={(
<div className="space-between w100">
  <Tag>Pending</Tag>
  <a className="blueLink">Evidence</a>
</div>
)}
                  />
                </div>
              </TabPane>
              <TabPane tab={experienceTab} key="2">
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
