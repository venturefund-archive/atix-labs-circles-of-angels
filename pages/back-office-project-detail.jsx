import React from 'react';
import { Button } from 'antd';
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
                      key={i}
                    />
                  ))}
                </div>
              </div>
              <div />
            </div>
            <div className="SubmitProject">

               <Button onClick={Routing.goBack}>Back</Button> 
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

export default BackofficeProjectDetail;
