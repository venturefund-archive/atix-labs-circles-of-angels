import React from 'react';
import { getProject } from '../api/projectApi';
import { getPhoto } from '../api/photoApi';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import ProjectMission from '../components/molecules/ProjectMission/ProjectMission';
import GeneralItem from '../components/atoms/GeneralItem/GeneralItem';
import Routing from '../components/utils/Routes';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import ProjectStatus from '../constants/ProjectStatus';

import './_style.scss';
import './_back-office-projec-detail.scss';

class BackofficeProjectDetail extends React.Component {
  static async getInitialProps({ query }) {
    const { projectId } = query;
    const project = (await getProject(projectId)).data;
    const coverPhoto = await getPhoto(project.coverPhoto);
    const projectDetail = {
      ...project,
      coverPhoto: coverPhoto.data
    };
    return { projectDetail };
  }

  render() {
    const { projectDetail } = this.props;
    console.log(projectDetail);
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
          <div className="TableContainer">
            <div>
              <img
                src={projectDetail.coverPhoto || ''}
                alt="projectCoverImage"
              />
              <div>
                <p>Entreprise</p>
                <h1>{projectDetail ? projectDetail.projectName : ''}</h1>
              </div>
            </div>
            <div className="HeaderProjectDetail">
              <img
                src="./static/images/button-arrow-back.svg"
                onClick={Routing.goBack}
                alt="Go Back"
              />
              <h1>Project Details</h1>
            </div>
            <div>
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
                    key={i}
                  />
                ))}
              </div>
            </div>

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
    );
  }
}

export default BackofficeProjectDetail;
