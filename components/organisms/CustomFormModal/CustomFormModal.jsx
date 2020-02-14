/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import useForm from '../../../hooks/useForm';
import './_style.scss';
import CustomForm from '../CustomForm/CustomForm';

const CustomFormModal = ({ title, formItems, visible, onConfirm, onClose, body }) => {
  const [clean, setClean] = useState(false);
  const [fields, setFields, handleChange, handleSubmit] = useForm(formItems);

  const onSubmit = async data => {
    await onConfirm(data);
    cleanForm();
  };

  const cleanForm = () => {
    setFields(formItems);
    onClose();
  };

  useEffect(() => {
    setClean(!visible);
  }, [visible]);

  return (
    <div>
      <Modal
        centered
        title={title}
        className="CustomFormModal"
        width="700px"
        visible={visible}
        onCancel={cleanForm}
        footer={[
          <CustomButton
            theme="Primary"
            key="back"
            buttonText="Confirm"
            onClick={() => handleSubmit(onSubmit)}
          />
        ]}
      >
          <div>
          {body}
        <CustomForm
          fields={fields}
          handleChange={handleChange}
          cleanInputFile={clean}
        />

          </div>
      </Modal>
    </div>
  );
};

CustomFormModal.defaultProps = {
  title: undefined,
  formItems: undefined,
  visible: false,
  onConfirm: undefined,
  onClose: undefined
};

CustomFormModal.propTypes = {
  title: PropTypes.string,
  formItems: PropTypes.shape({}),
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
};

export default CustomFormModal;
