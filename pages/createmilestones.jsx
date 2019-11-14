/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Component } from 'react';
import { Collapse, Row, Col, Upload, Steps, Divider, message } from 'antd';
import './_steps-milestones.scss';
import './_style.scss';
import TitlePage from '../components/atoms/TitlePage/TitlePage';
import SideBar from '../components/organisms/SideBar/SideBar';
import RowMilestones from '../components/organisms/RowMilestones/RowMilestones';
import Header from '../components/molecules/Header/Header';
import CustomButton from '../components/atoms/CustomButton/CustomButton';

const { Step } = Steps;

const ActionMilestonesPreview = () => (
  <div>
    <a className="Link blueLink">Edit</a>
    <Divider type="vertical" />
    <a className="Link blueLink">Add Activity</a>
    <Divider type="vertical" />
    <a className="redLink">Delete</a>
  </div>
);

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

function callback(key) {
  console.log(key);
}

const steps = [
  {
    content: (
      <div>
        <TitlePage textTitle="Download Project´s Milestones" />
        <Row className="Centered" type="flex" justify="center" align="middle">
          <Col
            className="gutter-row BlockDownload"
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={6}
            lg={{ span: 10 }}
          >
            <h1>Download Project Milestones</h1>
            <p>
              To create project Milestones, first you have to download a Project
              Milestone Template to fill in with your project plan information.
              Download the template and continue
            </p>
            <CustomButton
              theme="Alternative"
              buttonText="Download"
              icon="download"
              classNameIcon="iconDisplay"
            />
          </Col>
        </Row>
      </div>
    )
  },
  {
    content: (
      <div>
        <TitlePage textTitle="Upload Project´s Milestones" />
        <Row className="Step2" gutter={16}>
          <Col
            className="gutter-row Preview"
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={6}
            lg={{ span: 11 }}
          >
            <Row type="flex" justify="center">
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={18}
                lg={{ span: 18 }}
              >
                <h3>Milestones Verification</h3>
              </Col>
              <Col
                className="BlockVerification"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={18}
                lg={{ span: 18 }}
              >
                <span>You haven´t uploadead any documents yet</span>
              </Col>
            </Row>
          </Col>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={18}
            lg={{ span: 12 }}
          >
            <Row>
              <Col
                className="gutter-row"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={18}
                lg={{ span: 18 }}
              >
                <h3>Milestones Verification</h3>
                <span>
                  Upload your Excel document with your project plan with
                  milestones and activities detailed. All fields must be
                  complete, otherwise the verification will fail. File Format:
                  Excel.
                </span>
              </Col>
              <Col
                className="BlockVerification"
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={18}
                lg={{ span: 6 }}
              >
                <Upload {...props}>
                  <CustomButton
                    buttonText="Click to upload"
                    theme="Alternative"
                    icon="upload"
                    classNameIcon="iconDisplay"
                  />
                </Upload>
              </Col>
              <Col className="BlockVerification" span={24}>
                <Divider />
              </Col>
              <Col className="BlockVerification" lg={{ span: 6, offset: 17 }}>
                <CustomButton
                  buttonText="Process Milestones"
                  theme="Cancel"
                  icon="arrow-right"
                  classNameIcon="iconDisplay"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  },
  {
    content: (
      <div className="Step3">
        <Row type="flex" justify="space-around" align="top">
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={6}
            lg={{ span: 12, offset: 0 }}
          >
            <TitlePage textTitle="Preview and edit Milestones" />
          </Col>
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={6}
            lg={{ span: 3, offset: 9 }}
          >
            <CustomButton buttonText="+ New Milestone" theme="Alternative" />
          </Col>
        </Row>
        <RowMilestones
          ActionMilestones={(
<div className="w100 flex space-between">
  <a className="Link blueLink">Edit</a>
  <Divider type="vertical" />
  <a className="Link blueLink">Add Activity</a>
  <Divider type="vertical" />
  <a className="redLink">Delete</a>
</div>
)}
          ActionsActivities={
            <div className="SubWrapperActivitiesActions">
              <Col span={24}>
                <a className="blueLink">Edit</a>
              </Col>
              <Divider />
              <Col span={24}>
                <a className="redLink">Delete</a>
              </Col>
            </div>
          }
        />
        <RowMilestones
          ActionMilestones={(
<div className="w100 flex space-between">
  <a className="Link blueLink">Edit</a>
  <Divider type="vertical" />
  <a className="Link blueLink">Add Activity</a>
  <Divider type="vertical" />
  <a className="redLink">Delete</a>
</div>
)}
          ActionsActivities={(
<div className="SubWrapperActivitiesActions">
  <Col span={24}>
                <a className="blueLink">Edit</a>
              </Col>
  <Divider />
  <Col span={24}>
                <a className="redLink">Delete</a>
              </Col>
</div>
)}
        />
      </div>
    )
  }
];

class UploadMilestones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div className="StepsMilestonesWrapper">
        <div className="Content">
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <Row
            className="steps-action FooterButtons"
            type="flex"
            justify="space-around"
            align="middle"
          >
            {current < steps.length - 1 && (
              <Col
                xs={{ span: 24, order: 1 }}
                sm={{ span: 24, order: 1 }}
                md={6}
                lg={{ span: 2, offset: 10, order: 2 }}
              >
                <CustomButton
                  buttonText="Next"
                  theme="Primary"
                  onClick={() => this.next()}
                />
              </Col>
            )}
            {current === steps.length - 1 && (
              <Col
                xs={{ span: 24, order: 1 }}
                sm={{ span: 24, order: 1 }}
                md={6}
                lg={{ span: 3, offset: 9, order: 2 }}
              >
                <CustomButton
                  buttonText="Save & Continue"
                  theme="Primary"
                  onClick={() => message.success('Processing complete!')}
                />
              </Col>
            )}
            {current > -1 && (
              <Col
                xs={{ span: 24, order: 1 }}
                sm={{ span: 24, order: 1 }}
                md={6}
                lg={{ span: 12, offset: 0, order: 1 }}
              >
                <CustomButton
                  buttonText="Previous"
                  theme="Cancel"
                  onClick={() => this.prev()}
                />
              </Col>
            )}
          </Row>
        </div>
      </div>
    );
  }
}

export default UploadMilestones;
