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
import BlockDiscussion from '../components/molecules/BlockDiscussion/BlockDiscussion';
import BlockChat from '../components/molecules/BlockChat/BlockChat';
import GeneralItem from '../components/atoms/GeneralItem/GeneralItem';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import AvatarUser from '../components/atoms/AvatarUser/AvatarUser';
import DrawerUsers from '../components/organisms/DrawerUsers/DrawerUsers';
import RowMilestones from '../components/organisms/RowMilestones/RowMilestones';
import { createUserProject } from '../api/userProjectApi';
import { getPhoto } from '../api/photoApi';
import ProjectStatus from '../constants/ProjectStatus';
import Roles from '../constants/RolesMap';
import SeccionExperience from './experiences';
import { useGet, usePost } from '../hooks/useRequest';
import useQuery from '../hooks/useQuery';

const { TabPane } = Tabs;

function callback(key) {}

export default function ProjectDetail(props) {
  const { id } = useQuery();
  const projectId = id;
  const [{ data, errors, loading }] = useGet(`/projects/${projectId}/full`);

  const project = data;
  // if (project !== undefined) {
  //   project.budgetStatus = 'blocked';
  // }

  // const applyToProject = async () => {
  //   const { projectDetail } = this.state;
  //   const { user } = this.props;
  //   const isFunder = user && user.role && user.role.id === Roles.PROJECT_SUPPORTER;
  //   if (isFunder) {
  //     const response = await createUserProject(user.id, projectDetail.id);

  //     if (response.error) {
  //       const { error } = response;
  //       const title = error.response
  //         ? `${error.response.status} - ${error.response.statusText}`
  //         : error.message;
  //       const content = error.response
  //         ? error.response.data.error
  //         : error.message;
  //       showModalError(title, content);
  //       return response;
  //     }
  //   }

  //   if (projectDetail.status === ProjectStatus.IN_PROGRESS) {
  //     Routing.toProjectProgress({
  //       projectId: projectDetail.id
  //     });
  //   } else {
  //     Routing.toConsensusMilestones({
  //       projectId: projectDetail.id,
  //       initialStep: 0
  //     });
  //   }
  // };

  // const { projectDetail, projectExperiences, milestones } = this.state;
  // const { projectId } = this.props;

  const Cards = ({ theme, category, user, usersName, avatarImage }) => {
    const classname = `Cards ${theme}`;
    return (
      <Col span={24} className={classname}>
        <Col span={24}>
          <h3>{category}</h3>
        </Col>
        <Col span={24}>
          <h3 className="bold"> {user}</h3>
        </Col>
        <Col span={24} className="flex">
          <Col span={3}>
            <AvatarUser tooltipText={usersName} avatarImage={avatarImage} />
          </Col>
          <Col span={21}>
            <span>{usersName}</span>
          </Col>
        </Col>
      </Col>
    );
  };

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

  const Project = () => {
    if (project === undefined) return null;

    const completedMilestones = project.milestones.filter(
      m => m.status === 'completed'
    );
    const projectProgress =
      (completedMilestones.length / project.milestones.length) * 100;

    const projectStatus = ProjectStatus.PENDING_APPROVAL;

    return (
      <Row className="ProjectContent">
        <ProjectMission
          mission={project.mission}
          terms={project.problemAddressed}
          startedProject={projectStatus}
          milestones={data.milestones}
        />
        <Col span={1}>
          <Divider />
        </Col>
        <Col className="ProjectProgress" span={24}>
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
              percent={projectProgress}
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
    );
  };

  const ProjectDetailHeader = () => {
    // the label is not a label, it's the value.
    // and info is *actually* the label.
    // TODO : change this.
    const itemsData = [
      {
        info: 'Country of Impact',
        label: data.location,
        img: './static/images/world-icon.svg'
      },
      {
        info: 'Timeframe',
        label: data.timeframe,
        img: './static/images/calendar-icon.svg'
      },
      {
        info: 'Amount',
        label: data.goalAmount,
        img: './static/images/amount-icon.svg'
      }
    ];
    return (
      <div className="ProjectHeader">
        <img
          className="Banner"
          src="./static/images/imgcard.png"
          alt="Circles of Angels"
        />
        <div className="ProjectEnterprice">
          <Row className="BlockTop">
            <p>Organization Name</p>
            <Col span={21} className="flex">
              <h1>{project.projectName}</h1>
              <Tag color="cyan">Consensus Phase</Tag>
            </Col>
            <Col span={3}>
              <CustomButton theme="Primary" buttonText="Follow Project" />
            </Col>
          </Row>
          <Row type="flex" justify="space-between" className="BlockBottom">
            <Col span={13} className="flex">
                <GeneralItem link="https://questionsanswers.com"  info="FAQ-Funders and SE´s Questions & Answers" />
                 <GeneralItem label="$12,000"  info="Goal Amount" />
            </Col>
            <Col span={11} className="flex">
              {itemsData.map(item => (
                <GeneralItem {...item} key={`data-${item.info}`} />
              ))}
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  if (data === undefined) return null;

  return (
    <Row className="ContentComplete">
      <Col span={18} className="ProjectContainer DataSteps">
        <ProjectDetailHeader />
         <div className="BlockContent">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="details" key="1">
              <Project />
            </TabPane>
            <TabPane tab="Milestones" key="3">
              <RowMilestones {...project} />
            </TabPane>
                      <TabPane tab="Discussions" key="4">
            <BlockDiscussion />
            <BlockChat />
          </TabPane>
            <TabPane tab={experienceTab} key="2">
              <SeccionExperience
                experiences={project.experiences}
                onCreate={() => {}}
              />
            </TabPane>
          </Tabs>
        </div>
      </Col>
      <Col span={6} className="Right">
        <h3>Related users</h3>
        <Col span={12}>
          <h4>Followers</h4>
        </Col>
        <Col span={12} className="flex-end">
          <DrawerUsers />
        </Col>
        <Col span={24}>
          <AvatarUser
            tooltipText="UserName"
            avatarImage="./static/images/user1.png"
          />
          <AvatarUser
            tooltipText="UserName"
            avatarImage="./static/images/user2.png"
          />
          <AvatarUser
            tooltipText="UserName"
            avatarImage="./static/images/user3.png"
          />
          <AvatarUser
            tooltipText="UserName"
            avatarImage="./static/images/user4.png"
          />
        </Col>
        <Cards
          theme="Orange"
          category="Project Social"
          user="Entrepreneur"
          usersName="Jenny Steward"
          avatarImage="./static/images/user1.png"
        />
        <Cards
          theme="Blue"
          category="Interested in"
          user="Funding"
          usersName="Marvin Mccoy"
          avatarImage="./static/images/user2.png"
        />
        <Cards
          theme="Red"
          category="Interested in being"
          user="Oracles"
          usersName="Jorge Howard"
          avatarImage="./static/images/user3.png"
        />
        <Col span={24} className="BlockActions">
          <Col span={24}>
            <CustomButton
              theme="Alternative"
              buttonText="I want to be an Oracle"
            />
          </Col>
          <Col span={24}>
            <CustomButton theme="Secondary" buttonText="Invite Someone" />
          </Col>
        </Col>
      </Col>
    </Row>
  );
}
