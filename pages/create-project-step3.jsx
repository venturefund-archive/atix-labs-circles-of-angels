import React from "react";
import { Icon } from "antd";
import Header from "../components/molecules/Header/Header.jsx";
import SideBar from "../components/organisms/SideBar/SideBar.jsx";
import StepsProject from "../components/molecules/StepsProject/StepsProjects.jsx";
import ButtonPrimary from "../components/atoms/ButtonPrimary/ButtonPrimary";


import "./_create-project.scss";
import "./_style.scss";


const CreateProject = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="CreateProjectContainer">
        <h1>Create New Project</h1>
        <StepsProject />
        <div className="ProjectStep3Container">
        <Icon type="check-circle" theme="twoTone" twoToneColor="#15D380" className="IconSuccess" />
          <h1>Your Project has been created successfully!</h1>
          <h2>You can access to it from "My Projects"</h2>
          <ButtonPrimary text="Got it"/>
        </div>
      </div>
    </div>
  </div>
);
export default CreateProject;
