import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal } from 'antd';
import Field from '../../atoms/Field/Field';
import { fieldPropType } from '../../../helpers/proptypes';
import TitlePage from '../../atoms/TitlePage/TitlePage';

const ModalCreateActivity = ({
  visibility,
  onOk,
  onCancel,
  fields,
  handleChange
}) => (
  <Modal
    visible={visibility}
    onOk={onOk}
    onCancel={onCancel}
    width="600px"
    centered
  >
    <Fragment>
      <TitlePage textTitle="Create new activity" />
      <Row type="flex" justify="space-around" align="middle">
        <Col sm={24} md={24} lg={24}>
          <Field {...fields.description} handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field {...fields.reviewCriteria} handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field {...fields.category} handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field {...fields.keyPersonnel} handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field {...fields.budget} handleChange={handleChange} />
        </Col>
      </Row>
    </Fragment>
  </Modal>
);

ModalCreateActivity.defaultProps = {
  visibility: false
};

ModalCreateActivity.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    description: fieldPropType,
    reviewCriteria: fieldPropType,
    category: fieldPropType,
    keyPersonnel: fieldPropType,
    budget: fieldPropType
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  visibility: PropTypes.bool
};

export default ModalCreateActivity;
