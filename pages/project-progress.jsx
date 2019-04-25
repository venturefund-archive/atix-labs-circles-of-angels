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
  getProject
} from '../api/projectApi';
import { getUsers } from '../api/userProjectApi';
import { getTransferListOfProject } from '../api/transferApi';
import { getOracles } from '../api/userApi';
import { withUser } from '../components/utils/UserContext';
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

    milestonesResponse.data.forEach(milestone => {
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
      projectName: project.projectName,
      userProjects: users.data,
      projectId,
      transfers,
      oracles,
      actualAmount,
      filters
    };
  }

  render() {
    const {
      projectName,
      milestones,
      projectId,
      isBackofficeAdmin,
      filters
    } = this.props;

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
                    else Routing.toProjectDetail({ projectId });
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
                <h1>{projectName}</h1>
              </div>
              <div className="flex">
                <div className="vertical  Data">
                  <a className="TextBlue" href=".">
                    FAQLink
                  </a>
                  <span className="Overline">FAQ Document</span>
                </div>
                <Divider type="vertical" />
                <div className="vertical Data">
                  <Button onClick={this.clickDownloadProposal}>
                    Project Proposal <Icon type="download" />
                  </Button>
                </div>
                <Divider type="vertical" />
                <span className="listItem flex">
                  <Tooltip title="Hash">
                    <Icon component={HashIcon} />
                  </Tooltip>
                  760e7dab2836853c63805033e51466760e7dab2836853
                </span>
              </div>
            </div>
            <TableProjectProgress
              dataSource={milestones}
              projectName={projectName}
              projectId={projectId}
              filters={filters}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(ProjectProgress);
