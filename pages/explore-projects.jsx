import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import CardProject from "../components/molecules/CardProject/CardProject.jsx";
import "./_style.scss";
import "./_explore-projects.scss";
const projects = [
  {
    name: "Wedu",
    mission: "Lorem ipsum text",
    image: "/static/images/cover-project.jpg",
    location: "Cambodia",
    timeframe: "12 Month",
    amount: "$ 20.000 USD"
  },
  {
    name: "Webu 2.0",
    mission: "Lorem ipsum text",
    image: "/static/images/cover-project.jpg",
    location: "Tailandia",
    timeframe: "24 Month",
    amount: "$ 50.000 USD"
  }
];
const ExploreProjects = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="ProjectsContainer">
        <h1>Explore Projects</h1>
        <div className="ProjectsCardsContainer">
          {projects.map((project, i) => (
            <CardProject
              enterpriceName={project.name}
              enterpriceMission={project.mission}
              projectCardImage={project.image}
              enterpriceLocation={project.location} 
              timeframe={project.timeframe}
              amount={project.amount}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default ExploreProjects;
