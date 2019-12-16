import React from 'react';
import { Row, Col } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';

export default function CreateMilestonesStep1() {
  return (
    <div>
      <TitlePage textTitle="Download Project´s Milestones" />
      <Row className="Centered" type="flex" justify="center" align="middle">
        <Col
          className="gutter-row BlockDownload"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={6}
          lg={{ span: 10 }}
        >
          <h1>Download Project Milestones</h1>
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
          />
        </Col>
      </Row>
    </div>
  );
}
