import React, { Fragment } from 'react';
import { Col, Breadcrumb, Row } from 'antd';
import PropTypes from 'prop-types';
import FooterButtons from '../FooterButtons/FooterButtons';
import ModalProjectCreated from '../ModalProjectCreated/ModalProjectCreated';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';

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

const CreateProject = ({ setCurrentWizard }) => (
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
          onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.THUMBNAILS)}
        />
        <Items
          title="Project Detail"
          subtitle="Here you can upload your project detail"
          onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.DETAILS)}
        />
        <Items
          title="Project Proposal"
          subtitle="Here you can upload your project proposal"
          onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.PROPOSAL)}
        />
        <Items
          title="Project Milestones"
          subtitle="Upload milestones and edit them"
          onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.MILESTONES)}
        />
      </Col>
    </Row>
    <FooterButtons showCreateButton>
      <ModalProjectCreated />
    </FooterButtons>
  </Fragment>
);

CreateProject.propTypes = {
  setCurrentWizard: PropTypes.func.isRequired
};

export default CreateProject;
