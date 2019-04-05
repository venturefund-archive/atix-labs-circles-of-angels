import React from 'react';
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
    const projects = response.data;
    const cardPhotos = [];
    await Promise.all(
      projects.map(async project => {
        const projectCardPhoto = await getPhoto(project.cardPhoto);
        cardPhotos[project.id] = projectCardPhoto.data;
      })
    );
    return { projects, cardPhotos };
  }

  goToProjectDetail(projectId) {
    Routing.toProjectDetail({ projectId });
  }

  render() {
    const { projects, cardPhotos } = this.props;
    return (
      <div className="AppContainer">
        <SideBar />
        <div className="MainContent">
          <Header />

          <div className="ProjectsContainer">
            <h1>Explore Projects</h1>
            <div className="ProjectsCardsContainer">
              {projects.map(project => {
                const projectCardPhoto = cardPhotos[project.id];
                return (
                  <CardProject
                    enterpriceName={project.name}
                    enterpriceMission={project.mission}
                    projectCardImage={projectCardPhoto}
                    enterpriceLocation={project.location}
                    timeframe={project.timeframe}
                    amount={project.goalAmount}
                    key={project.id}
                    onClick={() => this.goToProjectDetail(project.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreProjects;
