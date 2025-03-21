/* eslint-disable no-undef */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { getProject } from '../api/projectApi';
import { getPhoto } from '../api/photoApi';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import ProjectMission from '../components/molecules/ProjectMission/ProjectMission';
import GeneralItem from '../components/atoms/GeneralItem/GeneralItem';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import { withUser } from '../components/utils/UserContext';
import ProjectStatus from '../constants/ProjectStatus';

import './_style.scss';
import './_back-office-projec-detail.scss';

class BackofficeProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDetail: {}
    };
  }

  static async getInitialProps({ query }) {
    const { projectId } = query;
    return { projectId };
  }

  componentDidMount = async () => {
    const { projectId } = this.props;
    const project = (await getProject(projectId)).data;
    const coverPhoto = await getPhoto(project.coverPhoto);
    const projectDetail = {
      ...project,
      coverPhoto: coverPhoto.data
    };
    this.setState({ projectDetail });
  };

  render() {
    const { projectDetail } = this.state;
    const itemsData = projectDetail
      ? [
          {
            subtitle: 'Country of Impact',
            title: projectDetail.location,
            iconItem: 'environment'
          },
          {
            subtitle: 'Timeframe',
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
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="ContentComplete">
            <div className="ProjectContainer DataSteps">
              <div className="ProjectHeader">
                <img
                  src={projectDetail.coverPhoto || ''}
                  alt="projectCoverImage"
                />
                <div className="ProjectEnterprice">
                  <p>Entreprise</p>
                  <h1>{projectDetail ? projectDetail.projectName : ''}</h1>
                </div>
              </div>
              <div className="ProjectContent">
                <ProjectMission
                  mission={projectDetail ? projectDetail.mission : ''}
                  terms={projectDetail ? projectDetail.problemAddressed : ''}
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
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                    />
                  ))}
                </div>
              </div>
              <div />
            </div>
            <div className="SubmitProject">
              <Button onClick={Routing.toBackOffice}>Back</Button>
              <Button
                onClick={() =>
                  Routing.toEditProject({ projectId: projectDetail.id })
                }
              >
                Edit project
              </Button>
              {ProjectStatus.IN_PROGRESS === projectDetail.status ? (
                <CustomButton
                  theme="Primary"
                  buttonText="View Progress"
                  onClick={() =>
                    Routing.toProjectProgress({
                      projectId: projectDetail.id
                    })
                  }
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(BackofficeProjectDetail);

BackofficeProjectDetail.propTypes = {
  projectId: PropTypes.number.isRequired
};
