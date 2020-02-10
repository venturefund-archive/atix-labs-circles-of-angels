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
import { newFundFormItems } from '../../../helpers/createProjectFormFields';
import './_style.scss';
import NewFundForm from '../NewFundForm.jsx/NewFundForm';

const ModalInvest = ({ visible, onCreate, onClose }) => {
  const [clean, setClean] = useState(false);
  const [fields, setFields, handleChange, handleSubmit] = useForm(
    newFundFormItems
  );

  const onSubmit = async data => {
    await onCreate(data);
    cleanForm();
  };

  const cleanForm = () => {
    setFields(newFundFormItems);
    onClose();
  };

  useEffect(() => {
    setClean(!visible);
  }, [visible]);

  return (
    <div>
      <Modal
        title="Fund Project"
        className="ModalFund"
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
        <NewFundForm
          fields={fields}
          handleChange={handleChange}
          cleanInputFile={clean}
        />
      </Modal>
    </div>
  );
};

ModalInvest.defaultProps = {
  visible: false,
  onCreate: undefined,
  onClose: undefined
};

ModalInvest.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  onClose: PropTypes.func
};

export default ModalInvest;
