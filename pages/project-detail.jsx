import React from 'react';
import Router from 'next/router';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import { withUser } from '../components/utils/UserContext';
import { withErrorPopUp } from '../components/utils/ErrorPopUpContext';

import './_style.scss';
import './_project-detail.scss';

import ErrorPopUp from '../components/molecules/ErrorPopUp/ErrorPopUp';
import ProjectMission from '../components/molecules/ProjectMission/ProjectMission';
import GeneralItem from '../components/atoms/GeneralItem/GeneralItem';
import ButtonSuccess from '../components/atoms/ButtonSuccess/ButtonSuccess';

import { getProject } from '../api/projectApi';
import { createUserProject } from '../api/userProjectApi';

const imageBaseUrl = './static/images';

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: {}
    };
  }

  static async getInitialProps(query) {
    const { projectId } = query.query;
    const response = await getProject(projectId);
    return { projectDetail: response.data };
  }

  applyToProject = async () => {
    const { projectDetail, user, showErrorPopUp } = this.props;

    const response = await createUserProject(user.id, projectDetail.id);
    console.log('RESPONSE', response);

    if (response.error) {
      this.setState({ error: response.error });
      showErrorPopUp();
      return response;
    }

    Router.push(
      {
        pathname: '/concensus-milestones',
        query: { projectJSON: JSON.stringify(projectDetail) }
      },
      '/concensus-milestones'
    );
  };

  render() {
    const { error } = this.state;
    const { visibleErrorPopUp, hideErrorPopUp, projectDetail } = this.props;

    console.log(projectDetail);
    const itemsData = projectDetail
      ? [
          {
            subtitle: 'Enterprise Location',
            title: projectDetail.location,
            iconItem: `${imageBaseUrl}/icon-place.svg`
          },
          {
            subtitle: 'Timeframe',
            title: projectDetail.timeframe,
            iconItem: `.${imageBaseUrl}/icon-timeframe.svg`
          },
          {
            subtitle: 'Amount',
            title: projectDetail.goalAmount,
            iconItem: `${imageBaseUrl}/icon-amount.svg`
          },
          {
            subtitle: 'Name of Lead',
            title: projectDetail.ownerName,
            iconItem: `${imageBaseUrl}/icon-lead.svg`
          },
          {
            subtitle: 'Mail of Lead',
            title: projectDetail.ownerEmail,
            iconItem: `${imageBaseUrl}/icon-mail.svg`
          }
        ]
      : [];
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />
          <div className="ProjectContainer">
            {error && (
              <ErrorPopUp
                visible={visibleErrorPopUp}
                errorMessage={
                  error.response ? error.response.data.error : error.message
                }
                errorTitle={
                  error.response
                    ? `${error.response.status} - ${error.response.statusText}`
                    : error.message
                }
                handleOk={hideErrorPopUp}
              />
            )}
            <div className="ProjectHeader">
              <img
                src={projectDetail ? projectDetail.coverPhoto : ''}
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
                <h1>Generals</h1>
                {itemsData.map((item, i) => (
                  <GeneralItem
                    subtitle={item.subtitle}
                    title={item.title}
                    iconItem={item.iconItem}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="SubmitProject">
            <ButtonSuccess text="Go to project" onClick={this.applyToProject} />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(withErrorPopUp(ProjectDetail));
