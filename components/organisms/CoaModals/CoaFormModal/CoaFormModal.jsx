import React from 'react';
import PropTypes from 'prop-types';
import './coa-form-modal.scss';

import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaBaseModal } from '../CoaBaseModal/CoaBaseModal';

export const CoaFormModal = ({ children, title, onSave, onCancel, form, ...rest }) => {
  const handleSave = () => {
    form.validateFields((err, values) => {
      if (!err) {
        onSave(values);
        form.resetFields();
        onCancel();
      }
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <CoaBaseModal
      {...rest}
      footer={
        <div className="o-coaFormModal">
          <CoaButton type="ghost" onClick={handleCancel}>
            Cancel
          </CoaButton>
          <CoaButton type="primary" onClick={handleSave}>
            Save
          </CoaButton>
        </div>
      }
    >
      <TitlePage textTitle={title} />
      {children}
    </CoaBaseModal>
  );
};

CoaFormModal.defaultProps = {
  children: undefined,
  title: undefined,
  onSave: undefined,
  onCancel: undefined,
  form: undefined
};

CoaFormModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any)
};
