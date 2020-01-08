import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';
import Field from '../../../atoms/Field/Field';
import { fieldPropType } from '../../../../helpers/createProjectFormFields';

const CreateMilestonesStep2 = ({
  fields,
  handleChange,
  handleProcessMilestones,
  errorList,
  processError,
  processed
}) => (
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
            {processed && processError && <span>{processError}</span>}
            {processed && !processError && <span>Milestones created!</span>}
            {processed &&
              !processError &&
              errorList.length > 0 &&
              errorList.map(error => (
                <span>
                  {error.rowNumber}: {error.msg}
                </span>
              ))}
            {!processed && !errorList.length > 0 && (
              <span>You haven't uploaded any documents yet</span>
            )}
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
              Upload your Excel document with your project plan with milestones
              and activities detailed. All fields must be complete, otherwise
              the verification will fail. File Format: Excel.
            </span>
          </Col>
          <Col
            className="BlockVerification"
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={18}
            lg={{ span: 6 }}
          >
            <Field {...fields.milestoneFile} handleChange={handleChange} />
          </Col>
          <Col className="BlockVerification" span={24}>
            <Divider />
          </Col>
          <Col className="BlockVerification" lg={{ span: 6, offset: 17 }}>
            <CustomButton
              buttonText="Process Milestones"
              theme={!fields.milestoneFile.value ? 'disabled' : 'Cancel'}
              icon="arrow-right"
              classNameIcon="iconDisplay"
              disabled={!fields.milestoneFile.value}
              onClick={() =>
                handleProcessMilestones(fields.milestoneFile.value)
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  </Fragment>
);

CreateMilestonesStep2.defaultProps = {
  errorList: [],
  processed: false,
  processError: undefined
};

CreateMilestonesStep2.propTypes = {
  fields: PropTypes.shape({
    milestoneFile: PropTypes.shape(fieldPropType)
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleProcessMilestones: PropTypes.func.isRequired,
  errorList: PropTypes.arrayOf(
    PropTypes.shape({ msg: PropTypes.string, rowNumber: PropTypes.number })
  ),
  processed: PropTypes.bool,
  processError: PropTypes.string
};

export default CreateMilestonesStep2;
