import React from 'react';
import PropTypes from 'prop-types';
import useForm from '../../../hooks/useForm';
import ModalCreateMilestone from '../../molecules/ModalCreateMilestone/ModalCreateMilestone';
import { newMilestoneFormItems } from '../../../helpers/createProjectFormFields';

const CreateMilestoneContainer = ({
  setVisibility,
  visibility,
  createMilestone
}) => {
  const [fields, setFields, handleChange, handleSubmit] = useForm(
    newMilestoneFormItems
  );

  const onSubmit = async data => {
    const formData = {};
    data.forEach((value, key) => {
      formData[key] = value;
    });
    const response = await createMilestone(formData);
    if (response) {
      setFields(newMilestoneFormItems);
      setVisibility(false);
    }
  };

  return (
    <ModalCreateMilestone
      visibility={visibility}
      onOk={() => handleSubmit(onSubmit)}
      onCancel={() => setVisibility(false)}
      fields={fields}
      handleChange={handleChange}
    />
  );
};

CreateMilestoneContainer.defaultProps = {
  visibility: false
};

CreateMilestoneContainer.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  visibility: PropTypes.bool,
  createMilestone: PropTypes.func.isRequired
};

export default CreateMilestoneContainer;
