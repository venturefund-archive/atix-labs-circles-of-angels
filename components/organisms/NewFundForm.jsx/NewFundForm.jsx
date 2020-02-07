import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'antd';
import Field from '../../atoms/Field/Field';
import { fieldPropType } from '../../../helpers/proptypes';

const NewFundForm = ({ fields, handleChange }) => {
  const {
    amount,
    currency,
    destinationAccount,
    transferId,
    receiptPath
  } = fields;

  return (
    <Fragment>
      <Form>
        <Col sm={24} md={24} lg={24}>
          <Field {...amount} handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field {...currency} handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field {...destinationAccount} handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field {...transferId} handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field
            {...receiptPath}
            multiple
            type="file"
            name={receiptPath && receiptPath.name}
            handleChange={handleChange}
          />
        </Col>
      </Form>
    </Fragment>
  );
};

export default NewFundForm;

NewFundForm.defaulProps = {
  fields: {}
};

NewFundForm.propTypes = {
  fields: PropTypes.shape({
    comment: fieldPropType,
    photo: fieldPropType
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};
