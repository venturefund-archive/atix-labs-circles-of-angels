import React from "react";
import { Input, Icon } from "antd";

import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsProject from "../components/molecules/StepsProject/StepsProjects.jsx";
import UploadImage from "../components/molecules/UploadImage/UploadImage.jsx";
import WebFormProject from "../components/molecules/WebFormProject/WebFormProject.jsx";
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
        <div className="ProjectImagesContainer">
          <h1 className="CreateSubtitle">Project's Images</h1>
          <UploadImage
            subtitle="Project's Card Image"
            text="Lorem ipsum text description"
          />
          <UploadImage
            subtitle="Project's Cover Image"
            text="Lorem ipsum text description"
          />
          <UploadImage
            subtitle="Pitch Proposal Template"
            text="Lorem ipsum text description"
          />
        </div>
        <div className="ProjectDataContainer">
        <h1 className="CreateSubtitle">Project's Details</h1>
          <WebFormProject />
        </div>
        <div className="ControlSteps">
          <ButtonCancel text="Cancel" />
          <ButtonPrimary text="Continue" />
        </div>
      </div>
    </div>
  </div>
);
export default CreateProject;
