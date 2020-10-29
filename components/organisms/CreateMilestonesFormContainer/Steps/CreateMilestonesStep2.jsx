import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Empty, Modal } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';
import Field from '../../../atoms/Field/Field';
import { fieldPropType } from '../../../../helpers/proptypes';

const CreateMilestonesStep2 = ({
  fields,
  handleChange,
  handleProcessMilestones,
  skipStep,
  errorList,
  processError,
  processed,
  cleanFile,
  deleteAllMilestones
}) => {
  const [hasLoadedFile, setHasLoadedFile] = useState(false);

  useEffect(() => {
    setHasLoadedFile(
      fields.milestoneFile.value &&
        fields.milestoneFile.value[0] instanceof File
    );
  }, [fields.milestoneFile]);

  const processedWithErrors = processed && errorList.length > 0;

  const canProcess = hasLoadedFile && (!processed || processedWithErrors);

  const processMilestones = () => {
    handleProcessMilestones(
      fields.milestoneFile.name,
      fields.milestoneFile.value
    );
  };

  const openDeleteMilestones = () => {
    Modal.confirm({
      title: 'Replace Milestones?',
      content: 'Are you sure you want to replace all loaded Milestones?',
      okType: 'danger',
      onOk() {
        deleteMilestonesAndProcessNewOnes();
      }
    });
  };

  const deleteMilestonesAndProcessNewOnes = () => {
    //TODO: Add update or replace Milestone File to Back
    deleteAllMilestones();
    processMilestones();
  };

  return (
    <Fragment>
      <TitlePage textTitle="Upload Project's Milestones" />
      <Row className="Step2" gutter={16}>
        <Col
          className="gutter-row Preview"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={6}
          lg={{ span: 11 }}
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={20} lg={{ span: 20 }}>
            <Col
              className="gutter-row"
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={24}
              lg={{ span: 24 }}
            />
            <Col
              className="BlockVerification"
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={24}
              lg={{ span: 24 }}
            >
              {processed && processError && <span>{processError}</span>}
              {processed && !processError && !errorList.length && (
                <span>Milestones created!</span>
              )}
              {processed &&
                !processError &&
                errorList.length > 0 &&
                errorList.map(error => (
                  <div>
                    <p>
                      <strong>{error.rowNumber} :</strong>
                      {error.msg}
                    </p>
                    <br />
                  </div>
                ))}
              {!processed && !errorList.length > 0 && (
                <div className="EmptyMilestone vertical center">
                  <Empty description="You haven't uploaded any documents yet" />
                </div>
              )}
            </Col>
          </Col>
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
              lg={{ span: 5, offset: 1 }}
            >
              <Field
                {...fields.milestoneFile}
                handleChange={handleChange}
                clean={cleanFile}
              />
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
            <Col span={7}>
              <CustomButton
                buttonText="Process Milestones"
                theme={!hasLoadedFile ? 'disabled' : 'Primary'}
                classNameIcon="iconDisplay"
                disabled={!hasLoadedFile}
                onClick={() =>
                  canProcess ? processMilestones() : openDeleteMilestones()
                }
              />
            </Col>
            <Col span={5}>
              <CustomButton
                buttonText={
                  processed && !processedWithErrors
                    ? 'Edit Milestones'
                    : 'Skip Step'
                }
                theme="Alternative"
                icon="arrow-right"
                classNameIcon="iconDisplay"
                onClick={skipStep}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

CreateMilestonesStep2.defaultProps = {
  errorList: [],
  processed: false,
  processError: undefined,
  skipStep: () => undefined,
  cleanFile: false
};

CreateMilestonesStep2.propTypes = {
  fields: PropTypes.shape({
    milestoneFile: PropTypes.shape(fieldPropType)
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleProcessMilestones: PropTypes.func.isRequired,
  skipStep: PropTypes.func,
  errorList: PropTypes.arrayOf(
    PropTypes.shape({ msg: PropTypes.string, rowNumber: PropTypes.number })
  ),
  processed: PropTypes.bool,
  processError: PropTypes.string,
  cleanFile: PropTypes.bool,
  deleteAllMilestones: PropTypes.func.isRequired
};

export default CreateMilestonesStep2;
