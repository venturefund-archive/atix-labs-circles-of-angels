/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Icon, Breadcrumb, Divider, Button, Tooltip } from 'antd';
import { uniqWith, isEqual, isEmpty } from 'lodash';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import './_style.scss';
import './_concensus.scss';
import './_steps.scss';
import TableProjectProgress from '../components/organisms/TableProjectProgress/TableProjectProgress';
import Routing from '../components/utils/Routes';
import {
  getProjectMilestones,
  getProject,
  downloadProposal
} from '../api/projectApi';
import { changeBudgetStatus } from '../api/milestonesApi';
import { withUser } from '../components/utils/UserContext';
import { showModalError } from '../components/utils/Modals';
import BlockchainStatus from '../constants/BlockchainStatus';
import MilestoneActivityStatus from '../constants/MilestoneActivityStatus';

const HashIcon = () => (
  <img src="/static/images/hashIcon.svg" alt="hash" width="15" />
);

class ProjectProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milestones: [],
      project: {},
      filters: []
    };
  }

  static async getInitialProps(query) {
    const { projectId } = query.query;
    return { projectId };
  }

  componentDidMount = async () => {
    const { projectId } = this.props;
    const project = (await getProject(projectId)).data;
    const milestonesResponse = await getProjectMilestones(projectId);
    const milestonesAndActivities = [];
    const oraclesFilter = [];
    const sortedMilestones = milestonesResponse.data.sort(
      (a, b) => a.id - b.id
    );
    sortedMilestones.forEach(milestone => {
      const completedActivities = 0;
      const milestoneCompletion = {
        ...milestone,
        completedActivities
      };
      milestonesAndActivities.push(milestoneCompletion);
      milestoneCompletion.activities.forEach((activity, j) => {
        const activityWithId = {
          ...activity,
          type: `Activity ${j + 1}`
        };
        if (activity.oracle && !isEmpty(activity.oracle)) {
          oraclesFilter.push({
            text: activity.oracle.username,
            value: activity.oracle.username
          });
        }
        if (activity.status === MilestoneActivityStatus.COMPLETED) {
          milestoneCompletion.completedActivities++;
        }
        milestonesAndActivities.push(activityWithId);
      });
    });

    const filters = { oracles: uniqWith(oraclesFilter, isEqual) };

    this.setState({
      milestones: milestonesAndActivities,
      project,
      filters
    });
  };

  clickDownloadProposal = async () => {
    const { project } = this.state;
    const response = await downloadProposal(project.id);
    if (response.error) {
      const { error } = response;
      if (error.response) {
        error.response.data.error =
          // eslint-disable-next-line prettier/prettier
          "This project doesn't have a Proposal uploaded";
      }
      const title = error.response
        ? 'Error Downloading Project Proposal'
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return response;
    }
  };

  handleChangeBudgetStatus = async (milestoneId, budgetStatusId) => {
    const { milestones } = this.state;
    const response = await changeBudgetStatus(milestoneId, budgetStatusId);
    if (response.error) {
      const { error } = response;
      const title = error.response ? 'Error updating Milestone' : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return response;
    }
    const updatedMilestone = milestones.find(
      milestone => milestone.id === milestoneId
    );

    console.log(updatedMilestone);

    if (updatedMilestone) {
      updatedMilestone.budgetStatus.id = budgetStatusId;
    }

    this.setState({ milestones });
    return response;
  };

  render() {
    const { milestones, isBackofficeAdmin, filters, project } = this.state;
    const { isSocialEntrepreneur } = this.props;

    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="Content">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a
                  onClick={() => {
                    if (isBackofficeAdmin) Routing.goBack();
                    else Routing.toProjectDetail({ projectId: project.id });
                  }}
                >
                  <Icon type="arrow-left" />
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Project Progress</Breadcrumb.Item>
            </Breadcrumb>
            <div className="ProjectInfoHeader">
              <div>
                <p className="LabelSteps">Project Name</p>
                <h1>{project.projectName}</h1>
              </div>
              <div className="flex">
                <div className="vertical  Data">
                  <a
                    className="TextBlue"
                    href={project.faqLink}
                    target="_blank"
                  >
                    {project.faqLink}
                  </a>
                  <span className="Overline">
                    FAQ-Funders and SE's Questions & Answers Link
                  </span>
                </div>
                <Divider type="vertical" />
                <div className="vertical Data">
                  <Button onClick={this.clickDownloadProposal}>
                    Project Proposal <Icon type="download" />
                  </Button>
                </div>
                <Divider type="vertical" />
                {project.transactionHash && (
                  <span className="listItem flex relative">
                    <Tooltip title="Hash">
                      <Icon component={HashIcon} />
                    </Tooltip>
                    <a
                      target="_blank"
                      href={`https://explorer.testnet.rsk.co/txs/${
                        project.transactionHash
                      }`}
                    >
                      {project.transactionHash}
                    </a>
                    <div className="speech-bubble-ds-top">
                      <p>
                        <strong>What´s a HASH? </strong>
                        This is the transaction id in the Blockchain that
                        indicates when this project started it's execution phase
                      </p>
                      <div className="speech-bubble-ds-arrow-top" />
                    </div>
                  </span>
                )}
              </div>
            </div>
            <TableProjectProgress
              dataSource={milestones}
              projectName={project.projectName}
              projectId={project.id}
              filters={filters}
              isSocialEntrepreneur={isSocialEntrepreneur}
              onBudgetStatusChange={this.handleChangeBudgetStatus}
              projectConfirmedOnBlockchain={
                project.startBlockchainStatus === BlockchainStatus.CONFIRMED
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(ProjectProgress);
