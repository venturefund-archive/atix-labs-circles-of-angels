import React from 'react';
import { Divider } from 'antd';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CardProject from '../components/molecules/CardProject/CardProject';
import { getActiveProjects } from '../api/projectApi';
import { getPhoto } from '../api/photoApi';
import Routing from '../components/utils/Routes';
import './_style.scss';
import './_explore-projects.scss';

class ExploreProjects extends React.Component {
  static async getInitialProps(req) {
    const response = await getActiveProjects();
    const projectsWithoutPhoto = response.data;
    const projects = await Promise.all(
      projectsWithoutPhoto.map(async project => {
        const projectCardPhoto = await getPhoto(project.cardPhoto);
        return { ...project, cardPhoto: projectCardPhoto.data };
      })
    );
    return { projects };
  }

  goToProjectDetail(projectId) {
    Routing.toProjectDetail({ projectId });
  }

  render() {
    const { projects } = this.props;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />

          <div className="Content">
            <div className="ProjectInfoHeader titlepage">
              <h1>Explore Projects</h1>
              <Divider />
            </div>
            <div className="ProjectsCardsContainer">
              {projects.map(project => (
                <CardProject
                  enterpriceName={project.name}
                  enterpriceMission={project.mission}
                  projectCardImage={project.cardPhoto}
                  enterpriceLocation={project.location}
                  timeframe={project.timeframe}
                  amount={project.goalAmount}
                  key={project.id}
                  onClick={() => this.goToProjectDetail(project.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreProjects;
