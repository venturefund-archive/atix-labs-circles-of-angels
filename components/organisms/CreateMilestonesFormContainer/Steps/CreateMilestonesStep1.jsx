import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';

const CreateMilestonesStep1 = ({ handleDownload }) => (
  <Fragment>
    <TitlePage textTitle="Download Project´s Milestones Template" />
    <Row className="Centered" type="flex" justify="center" align="middle">
      <Col
        className="gutter-row BlockDownload"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={6}
        lg={{ span: 10 }}
      >
        <h1>Download Project´s Milestones Template</h1>
        <p>
          To create project Milestones, first you have to download a Project
          Milestone Template to fill in with your project plan information.
          Download the template and continue
        </p>
        <CustomButton
          theme="Alternative"
          buttonText="Download"
          icon="download"
          classNameIcon="iconDisplay"
          onClick={handleDownload}
        />
      </Col>
    </Row>
  </Fragment>
);

CreateMilestonesStep1.propTypes = {
  handleDownload: PropTypes.func.isRequired
};

export default CreateMilestonesStep1;
