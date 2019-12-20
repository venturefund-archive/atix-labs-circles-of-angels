/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router';
import '../_style.scss';
import './_landing.scss';
import TopBar from '../../components/organisms/TopBar/TopBar';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import ProjectCard from '../projects/ProjectCard';

function Landing() {
  const [visibility, setVisibility] = useState(false);
  const history = useHistory();

  return (
    <Row className="Landing">
      <TopBar setVisibility={setVisibility} visibility={visibility} />
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
            <CustomButton
              onClick={() => history.push('/register?role=entrepreneur')}
              buttonText="I´ve got a project!"
              theme="Primary"
            />
            <CustomButton
              onClick={() => history.push('/register?role=funder')}
              buttonText="I want to fund!"
              theme="White"
            />
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
