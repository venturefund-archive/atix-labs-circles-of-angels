import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './coa-form-modal.scss';

import classNames from 'classnames';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import { CoaBaseModal } from '../CoaBaseModal/CoaBaseModal';

export const CoaFormModal = ({
  children,
  title,
  onSave,
  onCancel,
  form,
  logoImage,
  withLogo,
  buttonsPosition,
  ...rest
}) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const handleSave = () => {
    setIsSubmitLoading(true);
    form.validateFields(async (err, values) => {
      if (!err) {
        await onSave(values);
        setIsSubmitLoading(false);
        form.resetFields();
        return onCancel();
      }
      setIsSubmitLoading(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <CoaBaseModal
      className="o-coaFormModal"
      footer={
        <div
          className={classNames('o-coaFormModal__footerContainer', {
            [`--${buttonsPosition}`]: buttonsPosition
          })}
        >
          <CoaButton type="ghost" onClick={handleCancel} className="o-coaFormModal__button">
            <span className="o-coaFormModal__button__text">Cancel</span>
          </CoaButton>
          <CoaButton
            type="primary"
            onClick={handleSave}
            className="o-coaFormModal__button"
            loading={isSubmitLoading}
          >
            <span className="o-coaFormModal__button__text">Save</span>
          </CoaButton>
        </div>
      }
      onCancel={onCancel}
      withLogo={withLogo}
      title={title}
      {...rest}
    >
      {children}
    </CoaBaseModal>
  );
};

CoaFormModal.defaultProps = {
  children: undefined,
  title: undefined,
  onSave: undefined,
  onCancel: undefined,
  form: undefined,
  buttonsPosition: 'right',
  logoImage: undefined,
  withLogo: undefined
};

CoaFormModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  buttonsPosition: PropTypes.string,
  logoImage: PropTypes.string,
  withLogo: PropTypes.bool
};
