import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'antd';
import Field from '../../atoms/Field/Field';
import { fieldPropType } from '../../../helpers/proptypes';

const NewExperienceForm = ({ fields, handleChange }) => {
  const { comment, photos } = fields;

  return (
    <Fragment>
      <Form className="login-form">
        <Col sm={24} md={24} lg={24}>
          <Field {...comment} type="textArea" handleChange={handleChange} />
        </Col>
        <Col sm={24} md={24} lg={24}>
          <Field
            {...photos}
            multiple
            type="file"
            name={photos.name}
            handleChange={handleChange}
          />
        </Col>
      </Form>
    </Fragment>
  );
};

export default NewExperienceForm;

NewExperienceForm.defaulProps = {
  fields: {}
};

NewExperienceForm.propTypes = {
  fields: PropTypes.shape({
    comment: fieldPropType,
    photo: fieldPropType
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};
