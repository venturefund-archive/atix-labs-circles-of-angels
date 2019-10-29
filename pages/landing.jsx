/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Tag, Row, Col } from 'antd';

import './_landing.scss';
import './_style.scss';
import TopBar from '../components/organisms/TopBar/TopBar';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import TitlePage from '../components/atoms/TitlePage/TitlePage';

const ProjectCard = () => (
  <Col className="CardProject" span={8}>
    <div className="BlockImage ">
      <img src="./static/images/Img-card1.png" alt="imgproject1" />
    </div>
    <Row
      type="flex"
      justify="space-around"
      align="middle"
      className="ProjectSummery"
    >
      <Col sm={16} md={18} lg={18}>
        <h1>Yellow Hammock</h1>
      </Col>
      <Col sm={6} md={6} lg={6}>
        <Tag color="red">Funding Phase</Tag>
      </Col>
      <Col span={24}>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </Col>
    </Row>
  </Col>
);

function Landing() {
  const [visibility, setVisibility] = useState(false);
  return (
    <Row className="Landing">
      <TopBar
        registrationText="Register"
        setVisibility={setVisibility}
        visibility={visibility}
      />
      <Row type="flex" className="BlockBanner Wrapper" align="middle">
        <Col sm={24} md={24} lg={24}>
          <h1>
            Making impact <br />
            funding accesible
          </h1>
          <h2>
            Enabling Purposeled companies to grow, flourish and <br /> impact
            local communities
          </h2>
          <Col className="space-between" sm={24} md={6} lg={7}>
            <CustomButton buttonText="I´ve got a project!" theme="Primary" />
            <CustomButton buttonText="I want to fund!" theme="White" />
          </Col>
        </Col>
      </Row>
      
      <Row className="Wrapper" gutter={30} type="flex" align="middle">
        <Col span={24}>
          <TitlePage textTitle="Our Impact Projects" />
        </Col>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </Row>
    </Row>
  );
}

export default Landing;
