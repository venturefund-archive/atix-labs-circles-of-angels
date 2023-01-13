import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './coa-dialog-modal.scss';

import classNames from 'classnames';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import { CoaBaseModal } from '../CoaBaseModal/CoaBaseModal';

export const CoaDialogModal = ({
  children,
  title,
  onSave,
  onCancel,
  form,
  logoImage,
  withLogo,
  buttonsPosition,
  withoutCancelButton,
  okText,
  cancelText,
  ...rest
}) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const handleSave = async () => {
    setIsSubmitLoading(true);

    try {
      if (!form) {
        await onSave?.();
        return setIsSubmitLoading(false);
      }

      form.validateFields(async (err, values) => {
        if (!err) {
          await onSave(values);
          setIsSubmitLoading(false);
          form.resetFields();
          // NOTE: This behavior is for modals used in signing Messages
          if (cancelText === 'Go Back') return;
          return onCancel();
        }
        setIsSubmitLoading(false);
      });
    } catch {
      setIsSubmitLoading(false);
    }
  };

  const handleCancel = () => {
    if (!form) return onCancel?.();

    form.resetFields();
    onCancel();
  };

  return (
    <CoaBaseModal
      className="o-coaDialogModal"
      footer={
        <div
          className={classNames('o-coaDialogModal__footerContainer', {
            [`--${buttonsPosition}`]: buttonsPosition
          })}
        >
          {!withoutCancelButton && (
            <CoaButton type="ghost" onClick={handleCancel} className="o-coaDialogModal__button">
              <span className="o-coaDialogModal__button__text">{cancelText}</span>
            </CoaButton>
          )}
          <CoaButton
            type="primary"
            onClick={handleSave}
            className="o-coaDialogModal__button"
            loading={isSubmitLoading}
          >
            <span className="o-coaDialogModal__button__text">{okText}</span>
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

CoaDialogModal.defaultProps = {
  children: undefined,
  title: undefined,
  onSave: undefined,
  onCancel: undefined,
  form: undefined,
  buttonsPosition: 'right',
  logoImage: undefined,
  withLogo: undefined,
  okText: 'Save',
  cancelText: 'Cancel',
  withoutCancelButton: undefined
};

CoaDialogModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.objectOf(PropTypes.any),
  buttonsPosition: PropTypes.string,
  logoImage: PropTypes.string,
  withLogo: PropTypes.bool,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  withoutCancelButton: PropTypes.bool
};
