/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Component, Fragment } from 'react';
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
import '../../../pages/_createproject.scss';
import '../../../pages/_style.scss';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import InfoItem from '../../atoms/InfoItem/InfoItem';
import SideBar from '../SideBar/SideBar';
import Header from '../../molecules/Header/Header';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import FooterButtons from '../FooterButtons/FooterButtons';

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
const ProjectDetailFormContainer = props => (
  <Fragment>
    <TitlePage textTitle="Complete Project´s Details" />
    <Row type="flex" justify="space-around" align="middle">
      <Col className="CardExample" sm={8} md={8} lg={8}>
        <Col className="BlockImage" sm={24} md={24} lg={24}>
          <h5>Organization Name</h5>
          <h1>Wellness for families in Asia</h1>
          <Col className="flex" sm={24} md={24} lg={24}>
            <InfoItem
              img={
                <img src="./static/images/world.svg" alt="Circles of Angels" />
              }
              subtitle="Country of Impact"
              title="Cambodia"
              iconInfoItem="dollar"
            />
            <InfoItem
              img={
                <img
                  src="./static/images/calendar.svg"
                  alt="Circles of Angels"
                />
              }
              subtitle="Amount"
              title="12 Months"
              iconInfoItem="dollar"
            />
            <InfoItem
              img={
                <img src="./static/images/amount.svg" alt="Circles of Angels" />
              }
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
                      Share your Project Mission, the impact you have made so
                      far and what your project is about
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
                      Share with us the problem that you are tackling, what you
                      are trying to solve and how the funds will help support
                      your goal
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
    <FooterButtons />
  </Fragment>
);
export default ProjectDetailFormContainer;
