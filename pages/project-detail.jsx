import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";

import "./_style.scss";
import "./_project-detail.scss";

import ProjectMission from "../components/molecules/ProjectMission/ProjectMission.jsx";
import GeneralItem from "../components/atoms/GeneralItem/GeneralItem.jsx";
import ButtonSuccess from "../components/atoms/ButtonSuccess/ButtonSuccess.jsx";

const projectDetail = {
  entrepriceName: "Wedu",
  mission: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
  terms: "50,000 USD concessionary loan (or recoverable grant) to allocate for FISA contracts and 50,000 USD grant for FISA development operations.",
  titleLocation: "Cambodia",
  titleTimeframe: "12 Month",
  titleAmount: "$ 20.000 USD",
  titleLead: "Mario Ferro",
  titleMailLead: "mario@weduglobal.org"
};

const ProjectDetail = () => {
  const itemsData = [
    {
      subtitle: "Enterprice Location",
      title: projectDetail.titleLocation,
      iconItem: "./static/images/icon-place.svg"
    },
    {
      subtitle: "Timeframe",
      title: projectDetail.titleTimeframe,
      iconItem: "./static/images/icon-timeframe.svg"
    },
    {
      subtitle: "Amount",
      title: projectDetail.titleAmount,
      iconItem: "./static/images/icon-amount.svg"
    },
    {
      subtitle: "Name of Lead",
      title: projectDetail.titleLead,
      iconItem: "./static/images/icon-lead.svg"
    },
    {
      subtitle: "Mail of Lead",
      title: projectDetail.titleMailLead,
      iconItem: "./static/images/icon-mail.svg"
    }
  ];

  return (
    <div className="AppContainer">
      <SideBar />
      <div className="MainContent">
        <Header />
        <div className="ProjectContainer">
          <div className="ProjectHeader">
            <img
              src="/static/images/cover-project.jpg"
              alt="projectCoverImage"
            />
            <div className="ProjectEnterprice">
              <p>Entreprice</p>
              <h1>{projectDetail.entrepriceName}</h1>
            </div>
          </div>
          <div className="ProjectContent">
            <ProjectMission
              mission={projectDetail.mission}
              terms={projectDetail.terms}
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
          <ButtonSuccess text="Apply to project" />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
