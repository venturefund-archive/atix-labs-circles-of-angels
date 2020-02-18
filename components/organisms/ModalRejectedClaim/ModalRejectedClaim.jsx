/* eslint-disable max-len */
/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Col } from 'antd';
import Field from '../../atoms/Field/Field';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import useForm from '../../../hooks/useForm';
import { newTransferClaimFormItems } from '../../../helpers/createProjectFormFields';
import './_style.scss';

// TODO this modal should be replaced for a unique and generic modal (similar to ModalInvest and others)
const ModalRejectedClaim = ({ visible, onSubmit, onClose }) => {
  const [fields, setFields, handleChange, handleSubmit] = useForm(
    newTransferClaimFormItems
  );

  const onSubmitForm = async data => {
    await onSubmit(data);
    cleanForm();
  };

  const cleanForm = () => {
    setFields(newTransferClaimFormItems);
    onClose();
  };

  return (
    <div>
      <Modal
        title="New transfer claim"
        className="ModalClaim"
        width="700px"
        visible={visible}
        onCancel={cleanForm}
        footer={[
          <CustomButton
            theme="Primary"
            key="back"
            buttonText="Confirm"
            onClick={() => handleSubmit(onSubmitForm)}
          />
        ]}
      >
        <Form>
          <Col sm={24} md={24} lg={24}>
            <Field {...fields.rejectionReason} handleChange={handleChange} />
          </Col>
        </Form>
      </Modal>
    </div>
  );
};

ModalRejectedClaim.defaultProps = {
  visible: false,
  onSubmit: undefined,
  onClose: undefined
};

ModalRejectedClaim.propTypes = {
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
};

export default ModalRejectedClaim;
