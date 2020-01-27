/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Tabs, Col, Row, message } from 'antd';
import './_style.scss';
import './_steps.scss';
import './_project-detail.scss';
import {
  followProject,
  unfollowProject,
  isFollower,
  applyToProject,
  isCandidate
} from '../api/userProjectApi';
import useQuery from '../hooks/useQuery';
import ModalInvest from '../components/organisms/ModalInvest/ModalInvest';
import ProjectDetailHeader from '../components/molecules/ProjectDetailHeader/ProjectDetailHeader';
import { userPropTypes } from '../helpers/proptypes';
import { tabsContent } from '../helpers/projectDetailTabs';
import ProjectUsersPanel from '../components/molecules/ProjectUsersPanel/ProjectUsersPanel';
import {
  getProject,
  getProjectUsers,
  getProjectMilestones
} from '../api/projectApi';

const { TabPane } = Tabs;

const ProjectDetail = ({ user }) => {
  const { id } = useQuery();
  const projectId = id;
  const history = useHistory();

  const [project, setProject] = useState();
  const [projectUsers, setProjectUsers] = useState({
    followers: [],
    oracles: [],
    funders: []
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [milestones, setMilestones] = useState();

  // TODO: this should have pagination
  const fetchMilestones = async () => {
    const response = await getProjectMilestones(projectId);
    if (response.errors) {
      // TODO: if this fails what to do? ignore it? display an error?
      setMilestones();
      return;
    }
    setMilestones(response.data);
  };

  const fetchProjectUsers = async () => {
    const response = await getProjectUsers(projectId);
    if (response.errors) {
      // TODO: if this fails what to do? ignore it? display an error?
      setProjectUsers({
        followers: [],
        oracles: [],
        funders: []
      });
      return;
    }
    setProjectUsers(response.data);
  };

  const onFollowProject = async () => {
    try {
      await followProject(projectId);
      setIsFollowing(true);
      message.success('You are following this project now!');
    } catch (error) {
      message.error(error);
    }
  };

  const onUnfollowProject = async () => {
    try {
      await unfollowProject(projectId);
      setIsFollowing(false);
      message.success('You have followed this project');
    } catch (error) {
      message.error(error);
    }
  };

  const checkFollowing = async () => {
    try {
      const response = await isFollower(projectId);
      setIsFollowing(response);
    } catch (error) {
      message.error(error);
    }
  };

  const onApply = async role => {
    try {
      await applyToProject(projectId, role);

      setAlreadyApplied(true);
      message.success(`You have apply as possible ${role} for this project`);
    } catch (error) {
      message.error(error);
    }
  };

  const checkCandidate = async () => {
    try {
      const response = await isCandidate(projectId);
      setAlreadyApplied(response);
    } catch (error) {
      message.error(error);
    }
  };

  const fetchProject = async () => {
    const response = await getProject(projectId);
    if (response.errors) {
      message.error('An error occurred while fetching the project');
      history.goBack();
      return;
    }

    setProject(response.data);
    checkFollowing();
    checkCandidate();
    fetchProjectUsers();
    fetchMilestones();
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const renderTabs = projectData =>
    Object.values(tabsContent(projectData)).map(
      tab =>
        !tab.hidden && (
          <TabPane tab={tab.title} key={tab.key}>
            {tab.content}
          </TabPane>
        )
    );

  // TODO: milestones do not have status anymore.
  //       how do we get the project progress?
  const projectProgress = 0;

  if (!project) return null;
  return (
    <Row className="ContentComplete">
      <Col span={18} className="ProjectContainer DataSteps">
        <ProjectDetailHeader
          {...project}
          onFollowProject={onFollowProject}
          onUnfollowProject={onUnfollowProject}
          isFollower={isFollowing}
        />
        <div className="BlockContent">
          <Tabs defaultActiveKey="1">
            {renderTabs({
              ...project,
              milestones,
              progress: projectProgress
            })}
          </Tabs>
          <ModalInvest />
        </div>
      </Col>
      <Col span={6} className="Right">
        <ProjectUsersPanel
          entrepreneur={projectUsers.owner}
          followers={projectUsers.followers}
          funders={projectUsers.funders}
          oracles={projectUsers.oracles}
          userRole={user.role}
          onApply={onApply}
          applied={alreadyApplied}
        />
      </Col>
    </Row>
  );
};

export default ProjectDetail;

ProjectDetail.propTypes = {
  user: PropTypes.shape(userPropTypes).isRequired
};
