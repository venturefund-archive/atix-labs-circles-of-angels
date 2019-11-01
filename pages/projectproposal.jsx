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
import SideBar from '../components/organisms/SideBar/SideBar';
import FooterButtons from '../components/organisms/FooterButtons/FooterButtons';
import Header from '../components/molecules/Header/Header';
import HtmlEditor from '../components/organisms/HtmlEditor/HtmlEditor';

const projectdetail = () => (
  <div className="AppContainer DetailWrapper">
    <SideBar />
    <div className="MainContent">
      <Header />

      <div className="Content">
        <TitlePage textTitle="Complete Project´s Details" />
        <Row type="flex" justify="space-around" align="middle">
          <Col className="CardExample" sm={24} md={24} lg={24}>
            <HtmlEditor />
          </Col>
        </Row>
        <FooterButtons />
      </div>
    </div>
  </div>
);
export default projectdetail;
