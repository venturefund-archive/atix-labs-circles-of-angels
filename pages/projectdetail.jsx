/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Component } from 'react';
import {
  Tag,
  Row,
  Col,
  Skeleton,
  Divider,
  Form,
  Icon,
  Input,
  Upload
} from 'antd';
import './_createproject.scss';
import './_style.scss';
import TitlePage from '../components/atoms/TitlePage/TitlePage';
import InfoItem from '../components/atoms/InfoItem/InfoItem';
import SideBar from '../components/organisms/SideBar/SideBar';
import Header from '../components/molecules/Header/Header';
import CustomButton from '../components/atoms/CustomButton/CustomButton';

const { TextArea } = Input;

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
const projectdetail = ({ title, usertype }) => (
  <div className="AppContainer DetailWrapper">
    <SideBar />
    <div className="MainContent">
      <Header />

      <div className="Content">
        <TitlePage textTitle="Complete Project´s Details" />
        <Row type="flex" justify="space-around" align="middle">
          <Col className="CardExample" sm={8} md={8} lg={8}>
            <Col className="BlockImage" sm={24} md={24} lg={24}>
              <h5>Organization Name</h5>
              <h1>Wellness for families in Asia</h1>
                <Col className="flex" sm={24} md={24} lg={24}>
                  <InfoItem
                    img={<img src="./static/images/world.svg" alt="Circles of Angels" /> }
                    subtitle="Country of Impact"
                    title="Cambodia"
                    iconInfoItem="dollar"
                  />
                  <InfoItem 
                    img={<img src="./static/images/calendar.svg" alt="Circles of Angels" /> }
                    subtitle="Amount"
                    title="12 Months"
                    iconInfoItem="dollar"
                  />
                  <InfoItem
                    img={<img src="./static/images/amount.svg" alt="Circles of Angels" /> }
                    subtitle="Goal Amount"
                    title="$20.000"
                    iconInfoItem="dollar"
                  />
              </Col>
            </Col>
            <Col className="spacedivider" sm={24} md={24} lg={24}>
              <Col sm={24} md={24} lg={24}>
                <h4>Project Mission </h4>
              </Col>
              <Col sm={24} md={24} lg={24}>
                <Skeleton title={false} />
              </Col>
              <Col sm={24} md={24} lg={24}>
                <h4>The Problem </h4>
              </Col>
              <Col sm={24} md={24} lg={24}>
                <Skeleton paragraph={{ rows: 3 }} title={false} />
              </Col>
            </Col>

          </Col>
          <Divider type="vertical" />
          <Col sm={24} md={24} lg={12}>
            <Row gutter={22}>
              <Form className="login-form">
                <Col className="InputTwoLabel" sm={24} md={24} lg={24}>
                  <Form.Item
                    label={
                                            <div className="LabelDescription">
                        Project Mission
  <span>
                          Share your Project Mission, the impact you have made
                          so far and what your project is about
                        </span>
</div>
                    }
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col className="InputTwoLabel" sm={24} md={24} lg={24}>
                  <Form.Item
                    label={
                                            <div className="LabelDescription">
                        The Problem
  <span>
                          Share with us the problem that you are tackling, what
                          you are trying to solve and how the funds will help
                          support your goal
                        </span>
</div>
                    }
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col sm={24} md={24} lg={24}>
                  <Col sm={24} md={24} lg={18}>
                    <h3>Background Image</h3>
                    <span>
                      Recomended Image Size: 1400x400px. Format: PNG or JPG.
                    </span>
                  </Col>
                  <Col sm={24} md={24} lg={6}>
                    <Upload {...props}>
                      <CustomButton
                        buttonText="Click to upload"
                        theme="Alternative"
                      />
                    </Upload>
                  </Col>
                </Col>
              </Form>
            </Row>
          </Col>
        </Row>

        <Row
          className="FooterButtons"
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={6}
            lg={{ span: 4, offset: 0, order: 1 }}
          >
            <CustomButton buttonText="Back" theme="Cancel" />
          </Col>

          <Col
            className="space-between"
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
            md={6}
            lg={{ span: 3, offset: 15, order: 3 }}
          >
            <CustomButton
              buttonText="Save & Continue"
              theme="Primary"
              classNameIcon="iconDisplay"
              icon="arrow-right"
            />
          </Col>
        </Row>
      </div>
    </div>
  </div>
);
export default projectdetail;
