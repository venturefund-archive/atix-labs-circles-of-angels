/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Spin } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import useForm from '../../../hooks/useForm';
import './_style.scss';
import CustomForm from '../CustomForm/CustomForm';

const CustomFormModal = ({
  title,
  formItems,
  visible,
  onConfirm,
  onClose,
  body,
  width
}) => {
  const [clean, setClean] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [
    fields,
    setFields,
    handleChange,
    handleSubmit,
    ,
    isFormValid
  ] = useForm(formItems);

  const onSubmit = async data => {
    setSubmitting(true);
    const response = await onConfirm(data);
    if (!(response && response.errors)) {
      cleanForm();
    }
    setSubmitting(false);
  };

  const cleanForm = () => {
    setFields(formItems);
    onClose();
  };

  useEffect(() => {
    setClean(!visible);
  }, [visible]);

  const isButtonDisabled = () => submitting || !isFormValid();

  return (
    <div>
      <Modal
        centered
        title={title}
        className="CustomFormModal"
        width={width}
        visible={visible}
        onCancel={cleanForm}
        footer={[
          <CustomButton
            theme={!isButtonDisabled() ? 'Primary' : 'disabled'}
            key="back"
            buttonText="Confirm"
            onClick={() => handleSubmit(onSubmit)}
            disabled={isButtonDisabled()}
          />
        ]}
      >
        <Spin spinning={submitting}>
          <div>
            {body}
            <CustomForm
              fields={fields}
              handleChange={handleChange}
              cleanInputFile={clean}
            />
          </div>
        </Spin>
      </Modal>
    </div>
  );
};

CustomFormModal.defaultProps = {
  title: undefined,
  formItems: undefined,
  visible: false,
  onConfirm: undefined,
  onClose: undefined,
  body: null,
  width: 700
};

CustomFormModal.propTypes = {
  title: PropTypes.string,
  formItems: PropTypes.shape({}),
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  body: PropTypes.element,
  width: PropTypes.number
};

export default CustomFormModal;
