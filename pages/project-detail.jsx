import React from 'react';
import { showModalError } from '../components/utils/Modals';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import { withUser } from '../components/utils/UserContext';
import './_style.scss';
import './_project-detail.scss';
import ProjectMission from '../components/molecules/ProjectMission/ProjectMission';
import GeneralItem from '../components/atoms/GeneralItem/GeneralItem';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import { getProject } from '../api/projectApi';
import { createUserProject } from '../api/userProjectApi';
import { getPhoto } from '../api/photoApi';
import Routing from '../components/utils/Routes';
import ProjectStatus from '../constants/ProjectStatus';

const imageBaseUrl = './static/images';

class ProjectDetail extends React.Component {
  static async getInitialProps(query) {
    const { projectId } = query.query;
    const response = await getProject(projectId);
    const project = response.data;
    const coverPhoto = await getPhoto(project.coverPhoto);
    const projectDetail = {
      ...project,
      coverPhoto: coverPhoto.data
    };
    return { projectDetail };
  }

  applyToProject = async () => {
    const { projectDetail, user } = this.props;

    const response = await createUserProject(user.id, projectDetail.id);

    if (response.error) {
      const { error } = response;
      const title = error.response
        ? `${error.response.status} - ${error.response.statusText}`
        : error.message;
      const content = error.response
        ? error.response.data.error
        : error.message;
      showModalError(title, content);
      return response;
    }

    if (projectDetail.status == ProjectStatus.IN_PROGRESS) {
      Routing.toProjectProgress({
        projectId: projectDetail.id
      });
    } else {
      Routing.toConsensusMilestones({
        projectId: projectDetail.id,
        initialStep: 0
      });
    }
  };

  render() {
    const { projectDetail } = this.props;

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
            <CustomButton
              buttonText="Go to project"
              theme="Success"
              onClick={this.applyToProject}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(ProjectDetail);
