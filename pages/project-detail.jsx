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
import ProjectDetailHeader from '../components/molecules/ProjectDetailHeader/ProjectDetailHeader';
import { userPropTypes } from '../helpers/proptypes';
import { tabsContent } from '../helpers/projectDetailTabs';
import ProjectUsersPanel from '../components/molecules/ProjectUsersPanel/ProjectUsersPanel';
import {
  getProject,
  getProjectUsers,
  getProjectMilestones,
  getProjectExperiences,
  addProjectExperience,
  getProjectBlockchainData,
  updateProjectStatus
} from '../api/projectApi';
import {
  projectStatuses,
  publicProjectStatuses,
  SHOW_EXPERIENCES_STATUSES,
  claimMilestoneStatus
} from '../constants/constants';
import { assignOracleToActivity, getEvidences } from '../api/activityApi';
import { claimMilestone } from '../api/milestonesApi';
import {
  isFunder,
  isSupporter,
  isOwner,
  isEntrepreneur
} from '../helpers/utils';
import { getFundedAmount } from '../api/transferApi';

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
  const [milestones, setMilestones] = useState();
  const [experiences, setExperiences] = useState([]);
  // TODO this is set to true initialy  to avoid show the button in the first render before fetch
  const [alreadyApplied, setAlreadyApplied] = useState({
    oracles: true,
    funders: true
  });
  const [fundedAmount, setFundedAmount] = useState(0);
  const [fundingProgress, setFundingProgress] = useState(0);
  const [projectFinished, setProjectFinished] = useState(false);

  // TODO: this should have pagination
  const fetchMilestones = async () => {
    const response = await getProjectMilestones(project.id);
    console.log('milestones', response.data);
    if (response.errors) {
      // TODO: if this fails what to do? ignore it? display an error?
      setMilestones();
      return;
    }
    setMilestones(response.data);
  };

  const fetchProjectUsers = async () => {
    const response = await getProjectUsers(project.id);
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

  const fetchExperiences = async () => {
    const response = await getProjectExperiences(project.id);
    if (response.errors) {
      // TODO: if this fails what to do? ignore it? display an error?
      setExperiences([]);
      return;
    }
    setExperiences(response.data);
  };

  const fetchProject = async () => {
    const response = await getProject(projectId);
    if (response.errors) {
      message.error('An error occurred while fetching the project');
      history.goBack();
      return;
    }

    setProject(response.data);
  };

  const fetchEvidences = async taskId => {
    const response = await getEvidences(taskId);
    if (response.errors) {
      message.error('An error occurred while fetching the evidences');
      return [];
    }
    return response.data || [];
  };

  const fetchProjectBlockchainData = async () => {
    const response = await getProjectBlockchainData(projectId);
    if (response.errors) {
      throw new Error(response.errors);
    }
    return response.data;
  };

  const getTotalFundedAmount = async () => {
    const response = await getFundedAmount(project.id);
    if (response.errors) {
      setFundedAmount(0);
      return;
    }

    setFundedAmount(response.data.fundedAmount);
  };

  const onFollowProject = async () => {
    try {
      await followProject(project.id);
      setIsFollowing(true);
      fetchProjectUsers();
    } catch (error) {
      message.error(error);
    }
  };

  const onUnfollowProject = async () => {
    try {
      await unfollowProject(project.id);
      setIsFollowing(false);
      fetchProjectUsers();
    } catch (error) {
      message.error(error);
    }
  };

  const onEditProject = () => {
    const state = { projectId: project.id };
    history.push(`/create-project?id=${project.id}`, state);
  };

  const checkFollowing = async () => {
    try {
      const response = await isFollower(project.id);
      setIsFollowing(response);
    } catch (error) {
      message.error(error);
    }
  };

  const allowEditProject = () =>
    project &&
    project.status === projectStatuses.CONSENSUS &&
    isOwner(project, user) &&
    isEntrepreneur(user);

  const onApply = async role => {
    try {
      await applyToProject(project.id, role);

      setAlreadyApplied({ ...alreadyApplied, [role]: true });
      fetchProjectUsers();
      message.success(`You have apply as possible ${role} for this project`);
    } catch (error) {
      message.error(error);
    }
  };

  const checkCandidate = async () => {
    try {
      const response = await isCandidate(project.id);
      setAlreadyApplied(response);
    } catch (error) {
      message.error(error);
    }
  };

  const assignOracle = async (taskId, oracleId) => {
    const response = await assignOracleToActivity(taskId, oracleId);
    if (response.errors) {
      message.error(response.errors);
      return;
    }
    fetchMilestones();
  };

  const onCreateExperience = async experience => {
    const response = await addProjectExperience(project.id, experience);
    if (response.errors) {
      message.error(response.errors);
      return;
    }

    message.success('Experience added successfully!');
    fetchExperiences();
  };

  const onClaimMilestone = async milestoneId => {
    const response = await claimMilestone(milestoneId);
    if (response.errors) {
      message.error(response.errors);
      return;
    }

    message.success('Milestone claimed successfully!');
    fetchMilestones();
  };

  const allowNewFund = () =>
    project.status === projectStatuses.FUNDING &&
    isSupporter(user) &&
    isFunder(user, projectUsers.funders);

  const calculateFundingProgress = () => {
    if (!milestones || !milestones.length) return 0;
    const milestonesBudget = milestones.map(milestone => {
      const budget = milestone.tasks.reduce(
        (total, task) => Number(task.budget) + total,
        0
      );

      return {
        milestone: milestone.id,
        budget
      };
    });

    const totalBudget = milestonesBudget.reduce(
      (total, milestone) => milestone.budget + total,
      0
    );
    const progressPercentage =
      totalBudget > 0 ? (fundedAmount * 100) / totalBudget : 100;
    return progressPercentage > 100 ? 100 : progressPercentage;
  };

  const checkFinished = async () => {
    try {
      const isClaimed = milestone => milestone.claimStatus === claimMilestoneStatus.CLAIMED;
      const hasFinished = milestones.every(isClaimed);
      console.log('Didnt Finish');
      if(hasFinished) {
        console.log('Updating project');
        await updateProjectStatus(project.id, projectStatuses.FINISHED);
        setProjectFinished(projectFinished);
      }
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    if (project) {
      checkFollowing();
      checkCandidate();
      fetchProjectUsers();
      fetchMilestones();
      if (Object.values(publicProjectStatuses).includes(project.status))
        getTotalFundedAmount();
      if (SHOW_EXPERIENCES_STATUSES.includes(project.status))
        fetchExperiences();
    }
  }, [project]);

  useEffect(() => {
    checkFinished();
  }, [milestones]);

  const renderTabs = projectData =>
    Object.values(
      tabsContent({
        project: projectData,
        user,
        assignOracle,
        onCreateExperience,
        onClaimMilestone,
        allowNewFund: allowNewFund(),
        fetchEvidences
      })
    ).map(
      tab =>
        !tab.hidden && (
          <TabPane tab={tab.title} key={tab.key}>
            {tab.content}
          </TabPane>
        )
    );

  useEffect(() => {
    if (milestones && milestones.length) {
      const progress = calculateFundingProgress();
      setFundingProgress(progress);
    }
  }, [milestones, fundedAmount]);

  if (!project) return null;

  return (
    <Row className="ContentComplete">
      <Col xs={24} lg={18} className="ProjectContainer scrollY DataSteps">
        <ProjectDetailHeader
          {...project}
          fundedAmount={fundedAmount}
          onFollowProject={onFollowProject}
          onUnfollowProject={onUnfollowProject}
          onEditProject={onEditProject}
          allowEdit={allowEditProject()}
          isFollower={isFollowing}
          fetchBlockchainData={fetchProjectBlockchainData}
        />
        <div className="BlockContent">
          <Tabs defaultActiveKey="1">
            {renderTabs({
              ...project,
              milestones,
              progress: fundingProgress,
              experiences,
              oracles: projectUsers.oracles
            })}
          </Tabs>
        </div>
      </Col>
      <Col xs={24} lg={6} className="Right">
        <ProjectUsersPanel
          entrepreneur={projectUsers.owner}
          followers={projectUsers.followers}
          funders={projectUsers.funders}
          oracles={projectUsers.oracles}
          userRole={user.role}
          onApply={onApply}
          applied={alreadyApplied}
          status={project && project.status}
          isSupporter={isSupporter(user)}
        />
      </Col>
    </Row>
  );
};

export default ProjectDetail;

ProjectDetail.propTypes = {
  user: PropTypes.shape(userPropTypes).isRequired
};
