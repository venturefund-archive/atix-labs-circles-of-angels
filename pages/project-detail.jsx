import React from 'react';
import Link from 'next/link';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';

import './_style.scss';
import './_project-detail.scss';

import ProjectMission from '../components/molecules/ProjectMission/ProjectMission';
import GeneralItem from '../components/atoms/GeneralItem/GeneralItem';
import ButtonSuccess from '../components/atoms/ButtonSuccess/ButtonSuccess';

import { getProject } from '../api/projectApi';

const imageBaseUrl = './static/images';

class ProjectDetail extends React.Component {
  static async getInitialProps(query) {
    const { projectId } = query.query;
    const response = await getProject(projectId);
    return { projectDetail: response.data };
  }

  render() {
    const { projectDetail } = this.props;
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
            <Link
              href={{
                pathname: '/concensus-milestones',
                query: { projectJSON: JSON.stringify(projectDetail) }
              }}
              as="/concensus-milestones"
            >
              <ButtonSuccess text="Go to project" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDetail;
