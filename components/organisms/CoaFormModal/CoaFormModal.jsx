import React from 'react';
import './coa-form-modal.scss';

import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaModal } from '../CoaModal/CoaModal';

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
    <CoaModal
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
    </CoaModal>
  );
};
