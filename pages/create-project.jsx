/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, Fragment } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import './_createprojectsteps.scss';
import './_style.scss';
import ModalProjectCreated from '../components/organisms/ModalProjectCreated/ModalProjectCreated';
import TitlePage from '../components/atoms/TitlePage/TitlePage';
import CustomButton from '../components/atoms/CustomButton/CustomButton';
import Thumbnails from '../components/organisms/Thumbnails/Thumbnails';
import ProjectDetailFormContainer from '../components/organisms/ProjectDetailFormContainer/ProjectDetailFormContainer';
import ProjectProposalFormContainer from '../components/organisms/ProjectProposalFormContainer/ProjectProposalFormContainer';
import CreateMilestonesFormContainer from '../components/organisms/CreateMilestonesFormContainer/CreateMilestonesFormContainer';

const Items = ({ title, subtitle, onClick }) => (
  <Col className="Items flex" sm={24} md={24} lg={24}>
    <Col sm={1} md={1} lg={1}>
      <img src="./static/images/unchecked.svg" alt="unchecked" />
    </Col>
    <Col className="vertical" sm={24} md={21} lg={21}>
      <h3>{title}</h3>
      <h5>{subtitle}</h5>
    </Col>
    <Col sm={24} md={4} lg={2}>
      <CustomButton buttonText="Upload" theme="Alternative" onClick={onClick} />
    </Col>
  </Col>
);

const wizards = {
  thumbnails: <Thumbnails />,
  details: <ProjectDetailFormContainer />,
  proposal: <ProjectProposalFormContainer />,
  milestones: <CreateMilestonesFormContainer />
};

const CreateProject = () => {
  const [currentWizard, setCurrentWizard] = useState();
  return (
    <div className="Content">
      {currentWizard ? (
        wizards[currentWizard]
      ) : (
        <Fragment>
          <Breadcrumb>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/">Create Project</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <TitlePage textTitle="My project" />
          <Row
            className="ProjectsCardsContainer"
            type="flex"
            justify="space-around"
            align="middle"
            gutter={16}
          >
            <Col sm={24} md={24} lg={24}>
              <Items
                title="Thumbnails"
                subtitle="Here you can upload the thumbnails of your project"
                onClick={() => setCurrentWizard('thumbnails')}
              />
              <Items
                title="Project Detail"
                subtitle="Here you can upload your project detail"
                onClick={() => setCurrentWizard('details')}
              />
              <Items
                title="Project Proposal"
                subtitle="Here you can upload your project proposal"
                onClick={() => setCurrentWizard('proposal')}
              />
              <Items
                title="Project Milestones"
                subtitle="Upload milestones and edit them"
                onClick={() => setCurrentWizard('milestones')}
              />
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
              xs={{ span: 24, order: 3 }}
              sm={{ span: 24, order: 3 }}
              md={6}
              lg={{ span: 3, offset: 12 }}
            >
              <CustomButton
                buttonText="Save & Continue later"
                theme="Secondary"
              />
            </Col>
            <Col
              className="space-between"
              xs={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              md={6}
              lg={{ span: 3, offset: 0, order: 3 }}
            >
              <ModalProjectCreated />
            </Col>
          </Row>
        </Fragment>
      )}
    </div>
  );
};
export default CreateProject;
