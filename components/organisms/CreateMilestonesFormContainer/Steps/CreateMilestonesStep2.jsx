import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Empty } from 'antd';
import TitlePage from '../../../atoms/TitlePage/TitlePage';
import CustomButton from '../../../atoms/CustomButton/CustomButton';
import Field from '../../../atoms/Field/Field';
import { fieldPropType } from '../../../../helpers/proptypes';

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
            lg={{ span: 5, offset: 1 }}
          >
            <Field {...fields.milestoneFile} handleChange={handleChange} />
          </Col>
          <Col span={24}>
            <Divider />
          </Col>
          <CustomButton
            buttonText="Process Milestones"
            theme={!fields.milestoneFile.value ? 'disabled' : 'Primary'}
            icon="arrow-right"
            classNameIcon="iconDisplay"
            disabled={!fields.milestoneFile.value}
            onClick={() =>
              handleProcessMilestones(
                fields.milestoneFile.name,
                fields.milestoneFile.value
              )
            }
          />
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
