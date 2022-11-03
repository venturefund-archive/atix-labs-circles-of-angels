/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
/* import { useHistory } from 'react-router'; */
import { useRouter } from 'next/router';
import TopBar from '../../components/organisms/TopBar/TopBar';
import CustomButton from '../../components/atoms/CustomButton/CustomButton';
import ModalLogin from '../../components/organisms/ModalLogin/ModalLogin';
import customConfig from 'custom-config';

function Landing() {
  const [visibility, setVisibility] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const router = useRouter();
  /* const history = useHistory(); */

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

  const modalLogin = (
    <div className="WrapperModalLogin">
      <CustomButton
        data-testid="loginButton"
        buttonText="Log In"
        theme="Secondary"
        onClick={() => setVisibility(true)}
      />
      <ModalLogin data-testid="modal" setVisibility={setVisibility} visibility={visibility} />
    </div>
  );

  return (
    <Row
      className="Landing"
      style={{
        background: `url(${customConfig.BACKGROUND_PATH}) top left / cover no-repeat`
      }}
    >
      <TopBar modalLogin={modalLogin} />
    </Row>
  );
}

export default Landing;
