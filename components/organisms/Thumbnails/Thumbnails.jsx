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
  Breadcrumb,
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
const Thumbnails = () => (
  <Fragment>
    <TitlePage textTitle="Complete Project´s Thumbnail" />
    <Row type="flex" justify="space-around" align="middle">
      <Col className="CardExample" sm={8} md={8} lg={8}>
        <h3>This is the preview!</h3>
        <Col className="BlockImage" sm={24} md={24} lg={24}>
          <img src="./static/images/thumbnail-example.png" alt="thumbnail" />
        </Col>
        <Col className="spacedivider" sm={24} md={24} lg={24}>
          <Col sm={24} md={24} lg={16}>
            <h1>Wellness for families in Asia </h1>
          </Col>
          <Col sm={24} md={24} lg={8}>
            <Tag color="orange">Pending for approval</Tag>
          </Col>
        </Col>
        <Col className="flex" sm={24} md={24} lg={24}>
          <InfoItem
            subtitle="Country of Impact"
            title="Cambodia"
            iconInfoItem="dollar"
          />
          <Divider type="vertical" />
          <InfoItem subtitle="Amount" title="12 Months" iconInfoItem="dollar" />
          <Divider type="vertical" />
          <InfoItem
            subtitle="Goal Amount"
            title="$20.000"
            iconInfoItem="dollar"
          />
        </Col>
      </Col>
      <Divider type="vertical" />
      <Col sm={24} md={24} lg={12}>
        <Row gutter={22}>
          <Form className="login-form">
            <Col sm={24} md={24} lg={24}>
              <Form.Item label="Project Name">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col sm={24} md={24} lg={24}>
              <Form.Item label="Country of Impact">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col sm={24} md={24} lg={12}>
              <Form.Item label="Timeframe">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col sm={24} md={24} lg={12}>
              <Form.Item label="Goal Amount">
                <Input size="large" addonAfter={<Icon type="dollar" />} />
              </Form.Item>
            </Col>
            <Col sm={24} md={24} lg={24}>
              <Col sm={24} md={24} lg={18}>
                <h3>Thumbnail Image</h3>
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
export default Thumbnails;
