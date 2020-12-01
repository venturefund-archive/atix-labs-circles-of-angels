import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'antd';
import Field from '../../atoms/Field/Field';

const CustomForm = ({ fields, handleChange, cleanInputFile }) => (
  <Fragment>
    <Form>
      {fields &&
        Object.entries(fields).map(([, field]) => (
          <Col sm={24} md={24} lg={24}>
            <Field
              {...field}
              handleChange={handleChange}
              clean={cleanInputFile}
            />
          </Col>
        ))}
    </Form>
  </Fragment>
);

export default CustomForm;

CustomForm.defaultProps = {
  fields: undefined,
  cleanInputFile: false
};

CustomForm.propTypes = {
  fields: PropTypes.shape({}),
  handleChange: PropTypes.func.isRequired,
  cleanInputFile: PropTypes.bool
};
