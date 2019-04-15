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

const imageBaseUrl = './static/images';

class ProjectDetail extends React.Component {
  static async getInitialProps(query) {
    const { projectId } = query.query;
    const response = await getProject(projectId);
    const projectWithoutPhoto = response.data;
    const coverPhoto = await getPhoto(projectWithoutPhoto.coverPhoto);
    const projectDetail = {
      ...projectWithoutPhoto,
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

    Routing.toConsensusMilestones({
      projectId: projectDetail.id,
      projectName: projectDetail.projectName,
      faqLink: projectDetail.faqLink,
      initialStep: 0,
      goalAmount: projectDetail.goalAmount
    });
  };

  render() {
    const { projectDetail } = this.props;

    console.log(projectDetail);
    const itemsData = projectDetail
      ? [
          {
            subtitle: 'Enterprise Location',
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
      </div>
    );
  }
}

export default withUser(ProjectDetail);
