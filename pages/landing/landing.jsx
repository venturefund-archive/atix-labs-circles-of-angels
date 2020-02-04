/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import { useHistory } from 'react-router';
import '../_style.scss';
import './_landing.scss';
import TopBar from '../../components/organisms/TopBar/TopBar';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';
import TitlePage from '../../components/atoms/TitlePage/TitlePage';
import CardProject from '../../components/molecules/CardProject/CardProject';
import { getFeaturedProjects } from '../../api/projectApi';

function Landing() {
  const [visibility, setVisibility] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const history = useHistory();

  const fecthFeaturedProjects = async () => {
    try {
      const response = await getFeaturedProjects();
      setFeaturedProjects(response);
    } catch (error) {
      message.error(error);
    }
  };

  // TODO for the moment cards without redirection
  // const goToProjectDetail = project => {
  //   const state = { projectId: project.id };
  //   history.push(`/project-detail?id=${project.id}`, state);
  // };

  useEffect(() => {
    fecthFeaturedProjects();
  }, []);

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
              onClick={() => history.push('/register?role=supporter')}
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
        {/* TODO define if landing cards projects will have this format */}
        {featuredProjects.map(project => (
          <CardProject project={project} />
        ))}
      </Row>
    </Row>
  );
}

export default Landing;
