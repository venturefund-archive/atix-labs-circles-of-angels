import React, { Component } from 'react';
import { Tabs, message, Divider, Button, Icon } from 'antd';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import './_style.scss';
import './_concensus.scss';
import './_steps.scss';
import TableProjectProgress from '../components/organisms/TableProjectProgress/TableProjectProgress';

const ProjectProgress = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="Content">
        <div className="ProjectInfoHeader">
          <div className="space-between">
            <div className="">
              <div>
                <p className="LabelSteps">Project Name</p>
                <h1>Nombre del Proyecto</h1>
              </div>
            </div>
            <CustomButton buttonText="Start Project" theme="Primary" />
          </div>
        </div>
        <TableProjectProgress />
      </div>
    </div>
  </div>
);
export default ProjectProgress;
