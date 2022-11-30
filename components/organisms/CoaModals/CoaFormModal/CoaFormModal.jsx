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
        <div className="o-coaFormModal__footerContainer">
          <CoaButton type="ghost" onClick={handleCancel} className="o-coaFormModal__button">
            <span className="o-coaFormModal__button__text">Cancel</span>
          </CoaButton>
          <CoaButton type="primary" onClick={handleSave} className="o-coaFormModal__button">
            <span className="o-coaFormModal__button__text">Save</span>
          </CoaButton>
        </div>
      }
      className="o-coaFormModal__container"
    >
      <div className="o-coaFormModal__content">
        <TitlePage textTitle={title} />
        {children}
      </div>
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
