import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal } from 'antd';
import Field from '../../atoms/Field/Field';
import { fieldPropType } from '../../../helpers/proptypes';
import TitlePage from '../../atoms/TitlePage/TitlePage';
import './_style.scss';

const ModalCreateMilestone = ({
  visibility,
  onOk,
  onCancel,
  fields,
  handleChange
}) => (
  <Modal visible={visibility} onOk={onOk} onCancel={onCancel} width="600px">
    <Fragment>
      <TitlePage textTitle="Create new milestone" />
      <br />
      <Row type="flex" justify="space-around" align="middle">
        <Col sm={24} md={24} lg={24}>
          <Field {...fields.description} handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field {...fields.category} handleChange={handleChange} />
        </Col>
      </Row>
    </Fragment>
  </Modal>
);

ModalCreateMilestone.defaultProps = {
  visibility: false
};

ModalCreateMilestone.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    category: fieldPropType,
    description: fieldPropType
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  visibility: PropTypes.bool
};

export default ModalCreateMilestone;
