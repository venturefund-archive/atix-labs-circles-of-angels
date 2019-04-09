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
import { Divider,Button, Icon } from 'antd';
import Routing from '../components/utils/Routes';
const imageBaseUrl = './static/images';

class ProjectDetail extends React.Component {
  static async getInitialProps(query) {
    const { projectId } = query.query;
    const response = await getProject(projectId);
    return { projectDetail: response.data };
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
      faqLink: projectDetail.faqLink
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
            <div className="ProjectInfoHeader">
              <div className="space-between">
              <div className="">
                <div>
                  <p class="LabelSteps">Project Name</p>
                  <h1>Proyecto Eugenia</h1>
                </div>
                <div className="flex">
                  <div className="vertical  Data"> 
                    <p className="TextBlue">2,587</p>
                    <span className="Overline">Goal Amount</span>
                  </div>
                  <Divider type="vertical" />
                  <div className="vertical  Data"> 
                    <p className="TextGray">1,238</p>
                    <span className="Overline">Already</span>
                  </div>
                  <Divider type="vertical" />
                  <div className="vertical  Data"> 
                    <a href="" className="TextBlue">http://Document.Link</a>
                    <span className="Overline">FAQ Document</span>
                  </div>
                  <Divider type="vertical" />
                  <div className="vertical Data"> 
                  <Button>
      Proyect Proposal <Icon type="download" />
    </Button>
                  </div>
                </div>
              </div>
              <CustomButton
              buttonText="Start Project"
              theme="Primary" />
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
