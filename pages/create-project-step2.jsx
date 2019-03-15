import React from "react";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsProject from "../components/molecules/StepsProject/StepsProjects.jsx";
import DownloadTemplate from "../components/molecules/DownloadTemplate/DownloadTemplate.jsx";
import DragUploadFile from "../components/molecules/DragUploadFile/DragUploadFile.jsx";
import ButtonPrimary from "../components/atoms/ButtonPrimary/ButtonPrimary";
import ButtonCancel from "../components/atoms/ButtonCancel/ButtonCancel.jsx";

import "./_style.scss";
import "./_create-project.scss";


const CreateProject = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="CreateProjectContainer">
        <h1>Create New Project</h1>
        <StepsProject />
        <div className="ProjectDataContainer">
          <h1 className="CreateSubtitle">Projects Milestone Data</h1>
          <DownloadTemplate
            subtitle="Project's Detail Template"
            text="Lorem ipsum text description"
          />
          <DragUploadFile />
        </div>
        <div className="ControlSteps">
          <ButtonCancel text="Cancel" />
          <ButtonPrimary text="Create Milestones" />
        </div>
      </div>
    </div>
  </div>
);
export default CreateProject;
