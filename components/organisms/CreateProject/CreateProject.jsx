import React, { Fragment } from 'react';
import { Col, Breadcrumb, Row } from 'antd';
import PropTypes from 'prop-types';
import FooterButtons from '../FooterButtons/FooterButtons';
import ModalProjectCreated from '../ModalProjectCreated/ModalProjectCreated';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import { PROJECT_FORM_NAMES } from '../../../constants/constants';
import './_style.scss';

const Items = ({ title, subtitle, onClick, disabled }) => (
  <Col className="Items flex" sm={24} md={24} lg={24}>
    <Col sm={1} md={1} lg={1}>
      <img src="./static/images/unchecked.svg" alt="unchecked" />
    </Col>
    <Col className="vertical" sm={24} md={21} lg={21}>
      <h3>{title}</h3>
      <h5>{subtitle}</h5>
    </Col>
    <Col sm={24} md={4} lg={2}>
      <CustomButton
        buttonText="Upload"
        theme={disabled ? 'disabled' : 'Alternative'}
        onClick={onClick}
        disabled={disabled}
      />
    </Col>
  </Col>
);

const CreateProject = ({ project, setCurrentWizard }) => (
  <Fragment>
   <div className="CreateWrapper">
    <Breadcrumb>
      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="/">Create Project</a>
      </Breadcrumb.Item>
    </Breadcrumb>
    <TitlePage
      textTitle={
        project && project.projectName ? project.projectName : 'My project'
      }
    />
    <Row
      // className="ProjectsCardsContainer"
      type="flex"
      justify="space-around"
      align="middle"
      gutter={16}
    >
      <Col className="ProjectsItems" sm={24} md={24} lg={24}>
        <Items
          title="Thumbnails"
          subtitle="Here you can upload the thumbnails of your project"
          onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.THUMBNAILS)}
        />
        <Items
          title="Project Detail"
          subtitle="Here you can upload your project detail"
          onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.DETAILS)}
          disabled={!project || !project.id}
        />
        <Items
          title="Project Proposal"
          subtitle="Here you can upload your project proposal"
          onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.PROPOSAL)}
          disabled={!project || !project.id}
        />
        <Items
          title="Project Milestones"
          subtitle="Upload milestones and edit them"
          onClick={() => setCurrentWizard(PROJECT_FORM_NAMES.MILESTONES)}
          disabled={!project || !project.id}
        />
      </Col>
    </Row>
    <FooterButtons showCreateButton>
      <ModalProjectCreated />
    </FooterButtons>
    </div>
  </Fragment>
);

CreateProject.defaultProps = {
  project: undefined
};

CreateProject.propTypes = {
  setCurrentWizard: PropTypes.func.isRequired,
  project: PropTypes.shape({
    projectName: PropTypes.string.isRequired
  })
};

Items.defaultProps = {
  disabled: false
};

Items.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default CreateProject;
