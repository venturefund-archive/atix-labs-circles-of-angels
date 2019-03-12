import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import CardProject from "../components/molecules/CardProject/CardProject.jsx";

import "./_style.scss";
import "./_explore-projects.scss";

const ExploreProjects = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="ProjectsContainer">
      <h1>Explore Projects</h1>
        <div className="ProjectsCardsContainer">
        <CardProject
          enterpriceName="Enterprice Name"
          enterpriceMission="Lorem ipsum text description"
          projectCardImage="/static/images/cover-project.jpg"
        />
        <CardProject
          enterpriceName="Enterprice Name"
          enterpriceMission="Lorem ipsum text description"
          projectCardImage="/static/images/cover-project.jpg"
        />
        <CardProject
          enterpriceName="Enterprice Name"
          enterpriceMission="Lorem ipsum text description"
          projectCardImage="/static/images/cover-project.jpg"
        />
        <CardProject
          enterpriceName="Enterprice Name"
          enterpriceMission="Lorem ipsum text description"
          projectCardImage="/static/images/cover-project.jpg"
        />
        </div>
      </div>
    </div>
  </div>
);

export default ExploreProjects;
