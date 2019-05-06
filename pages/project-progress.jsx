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
  getActualProjectAmount,
  getProject,
  downloadProposal
} from '../api/projectApi';
import { getUsers } from '../api/userProjectApi';
import { getTransferListOfProject } from '../api/transferApi';
import { getOracles } from '../api/userApi';
import { withUser } from '../components/utils/UserContext';
import { showModalError } from '../components/utils/Modals';
import MilestoneActivityStatus from '../constants/MilestoneActivityStatus';

const HashIcon = () => (
  <img src="/static/images/hashIcon.svg" alt="hash" width="15" />
);

class ProjectProgress extends React.Component {
  static async getInitialProps(query) {
    const { projectId } = query.query;
    const project = (await getProject(projectId)).data;
    const milestonesResponse = await getProjectMilestones(projectId);
    const users = await getUsers(projectId);
    const transfers = await getTransferListOfProject(projectId);
    const oracles = await getOracles();
    const actualAmount = (await getActualProjectAmount(projectId)).data;
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

    return {
      milestones: milestonesAndActivities,
      userProjects: users.data,
      project,
      transfers,
      oracles,
      actualAmount,
      filters
    };
  }

  clickDownloadProposal = async () => {
    const { project } = this.props;
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

  render() {
    const { milestones, isBackofficeAdmin, filters, project } = this.props;

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
                <span className="listItem flex relative">
                  <Tooltip title="Hash">
                    <Icon component={HashIcon} />
                  </Tooltip>
                  {project.transactionHash}
                <div className="speech-bubble-ds-top">
                      <p>
                      <strong>What´s a HASH? </strong> 
                      This is the transaction id in the Blockhain that indicates when this project started it's execution phase
                      </p>
                      <div className="speech-bubble-ds-arrow-top" />
                    </div>
                </span>
              </div>
            </div>
            <TableProjectProgress
              dataSource={milestones}
              projectName={project.projectName}
              projectId={project.id}
              filters={filters}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(ProjectProgress);
