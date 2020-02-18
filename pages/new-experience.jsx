/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Col } from 'antd';
import useForm from '../hooks/useForm';
import NewExperienceForm from '../components/organisms/NewExperienceForm/NewExperienceForm';
import { newExperienceFormItems } from '../helpers/createProjectFormFields';
import CustomButton from '../components/atoms/CustomButton/CustomButton';

const NewExperience = ({ onCreate }) => {
  const [visible, setVisible] = useState(false);
  const [clean, setClean] = useState(false);

  const [fields, setFields, handleChange, handleSubmit] = useForm(
    newExperienceFormItems
  );

  const onSubmit = async data => {
    await onCreate(data);
    onClose();
  };

  const onClose = () => {
    setFields(newExperienceFormItems);
    setVisible(false);
  };

  const onShowModal = () => setVisible(true);

  useEffect(() => {
    setClean(!visible);
  }, [visible]);

  return (
    <Col className="CardNewExperience vertical" span={24}>
      <button type="button" onClick={onShowModal}>
        <img src="./static/images/Icon-experience.svg" alt="new-experience" />
        Add New Experience
      </button>
      <Modal
        width="600"
        centered
        className="ModalNewExperience"
        title="Add New Experience"
        visible={visible}
        onCancel={onClose}
        footer={[
          <CustomButton
            theme="Primary"
            key="back"
            buttonText="Add My Experience!"
            onClick={() => handleSubmit(onSubmit)}
          />
        ]}
      >
        <NewExperienceForm
          fields={fields}
          handleChange={handleChange}
          cleanInputFile={clean}
        />
      </Modal>
    </Col>
  );
};

NewExperience.propTypes = {
  onCreate: PropTypes.func.isRequired
};

export default NewExperience;
