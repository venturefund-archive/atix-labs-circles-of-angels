import React, { Component } from 'react';
import { Tabs, message, Divider, Button, Icon, Breadcrumb } from 'antd';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import './_style.scss';
import './_concensus.scss';
import './_steps.scss';
import TableProjectProgress from '../components/organisms/TableProjectProgress/TableProjectProgress';

const BreadCrumb = () => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <a href="@"><Icon type="arrow-left" /></a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Project Progress</Breadcrumb.Item>
  </Breadcrumb>
);

const ProjectProgress = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="Content">
        <BreadCrumb />
        <div className="ProjectInfoHeader">
          <div className="space-between">
            <div>
              <p className="LabelSteps">Project Name</p>
              <h1>Women Professional Development</h1>
            </div>
          </div>
        </div>
        <TableProjectProgress />
      </div>
    </div>
  </div>
);
export default ProjectProgress;
