import React, { Component } from 'react';
import {
  Tabs,
  message,
  Divider,
  Button,
  Icon,
  Breadcrumb,
  Progress,
  Tooltip
} from 'antd';
import Header from '../components/molecules/Header/Header';
import SideBar from '../components/organisms/SideBar/SideBar';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import './_style.scss';
import './_concensus.scss';
import './_project-evidence.scss';
import './_steps.scss';
import TableProjectProgress from '../components/organisms/TableProjectProgress/TableProjectProgress';
import Label from '../components/atoms/Label/Label';
import DragUploadFile from '../components/molecules/DragUploadFile/DragUploadFile';
import TableEvidence from '../components/organisms/TableEvidence/TableEvidence';

const BreadCrumb = () => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <Icon type="arrow-left" />
      <a href="@">Project Progress</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Evidence</Breadcrumb.Item>
  </Breadcrumb>
);
const ProjectEvidence = () => (
  <div className="AppContainer">
    <SideBar />
    <div className="MainContent">
      <Header />
      <div className="Content">
        <div className="DataSteps">
          <BreadCrumb />
          <div className="ProjectInfoHeader">
            <div className="space-between">
              <div>
                <Label labelText="project name" />
                <h1>Women Professional Development</h1>
              </div>
            </div>
          </div>
          <div className="b-right">
            <div>
              <Label labelText="Task name" />
              <h3>Junior Account Manager Hire</h3>
            </div>
            <div className="flex list">
              <span className="listItem flex">
                <Tooltip title="Date">
                  <Icon
                    style={{ fontSize: '16px', color: '#a3a5a9' }}
                    type="calendar"
                  />
                </Tooltip>
                20/09/2019
              </span>
              <Divider type="vertical" />
              <span className="listItem flex">
                <Tooltip title="Amount">
                  <Icon
                    style={{ fontSize: '16px', color: '#a3a5a9' }}
                    type="dollar"
                  />
                </Tooltip>
                1,156
              </span>
            </div>
          </div>
          <Divider />
          <Label labelText="Upload Evidence" theme="LabelBlue" />
          <DragUploadFile />
          <TableEvidence />
        </div>
        <div className="ControlSteps StepOne">
          <CustomButton theme="Primary" buttonText="Save and Continue Later" />
          <CustomButton theme="Success" buttonText="Continue" />
        </div>
      </div>
    </div>
  </div>
);
export default ProjectEvidence;
