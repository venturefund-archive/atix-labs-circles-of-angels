import React from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../hooks/useForm';
import { newActivityFormItems } from '../../../helpers/createProjectFormFields';
import ModalCreateActivity from '../../molecules/ModalCreateActivity/ModalCreateActivity';

const CreateActivityContainer = ({
  setVisibility,
  visibility,
  createActivity
}) => {
  const [fields, setFields, handleChange, handleSubmit] = useForm(
    newActivityFormItems
  );

  const onSubmit = async data => {
    const formData = {};
    data.forEach((value, key) => {
      formData[key] = value;
    });
    const response = await createActivity(formData);
    if (response) {
      setFields(newActivityFormItems);
      setVisibility(false);
    }
  };

  return (
    <ModalCreateActivity
      visibility={visibility}
      onOk={() => handleSubmit(onSubmit)}
      onCancel={() => setVisibility(false)}
      fields={fields}
      handleChange={handleChange}
    />
  );
};

CreateActivityContainer.defaultProps = {
  visibility: false
};

CreateActivityContainer.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  visibility: PropTypes.bool,
  createActivity: PropTypes.func.isRequired
};

export default CreateActivityContainer;
