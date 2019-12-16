import React from 'react';
import { Row, Col, Upload, Divider, message } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';

const mockUpload = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

export default function CreateMilestonesStep1({ fields, handleChange }) {
  return (
    <div>
      <TitlePage textTitle="Upload Project´s Milestones" />
      <Row className="Step2" gutter={16}>
        <Col
          className="gutter-row Preview"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={6}
          lg={{ span: 11 }}
        >
          <Row type="flex" justify="center">
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={18}
              lg={{ span: 18 }}
            >
              <h3>Milestones Verification</h3>
            </Col>
            <Col
              className="BlockVerification"
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={18}
              lg={{ span: 18 }}
            >
              <span>You haven´t uploadead any documents yet</span>
            </Col>
          </Row>
        </Col>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={18}
          lg={{ span: 12 }}
        >
          <Row>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={18}
              lg={{ span: 18 }}
            >
              <h3>Milestones Verification</h3>
              <span>
                Upload your Excel document with your project plan with
                milestones and activities detailed. All fields must be complete,
                otherwise the verification will fail. File Format: Excel.
              </span>
            </Col>
            <Col
              className="BlockVerification"
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={18}
              lg={{ span: 6 }}
            >
              {/* TODO unmock this */}
              <Upload {...mockUpload}>
                <CustomButton
                  buttonText="Click to upload"
                  theme="Alternative"
                  icon="upload"
                  classNameIcon="iconDisplay"
                />
              </Upload>
            </Col>
            <Col className="BlockVerification" span={24}>
              <Divider />
            </Col>
            <Col className="BlockVerification" lg={{ span: 6, offset: 17 }}>
              <CustomButton
                buttonText="Process Milestones"
                theme="Cancel"
                icon="arrow-right"
                classNameIcon="iconDisplay"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
