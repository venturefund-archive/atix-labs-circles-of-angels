import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";

import "./_style.scss";
import "./_project-detail.scss";

import ProjectMission from "../components/molecules/ProjectMission/ProjectMission.jsx";
import GeneralItem from "../components/atoms/GeneralItem/GeneralItem.jsx";
import ButtonSuccess from "../components/atoms/ButtonSuccess/ButtonSuccess.jsx";


const ProjectDetail = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="ProjectContainer">
        <div className="ProjectHeader">
          <img src="/static/images/cover-project.jpg" alt="projectCoverImage" />
          <div className="ProjectEnterprice">
            <p>Entreprice</p>
            <h1>WEDU</h1>
          </div>
        </div>
        <div className="ProjectContent">
        <ProjectMission />
        <div className="ProjectGeneralData">
          <h1>Generals</h1>
          <GeneralItem 
          subtitle="Enterprice Location"
          title="Cambodia"
          iconItem="./static/images/icon-place.svg"
          />
          <GeneralItem 
          subtitle="Timeframe"
          title="12 Months"
          iconItem="./static/images/icon-timeframe.svg"
          />
          <GeneralItem 
          subtitle="Amount"
          title="$ 100.000 USD"
          iconItem="./static/images/icon-amount.svg"
          />
          <GeneralItem 
          subtitle="Name of Lead"
          title="Mario Ferro"
          iconItem="./static/images/icon-lead.svg"
          />
          <GeneralItem 
          subtitle="Mail of Lead"
          title="mario.ferro@mail.com"
          iconItem="./static/images/icon-mail.svg"
          />
        </div>
      </div>
      </div>
      <div className="SubmitProject">
        <ButtonSuccess text="submit project"/>
      </div>
    </div>
  </div>
);

export default ProjectDetail;
