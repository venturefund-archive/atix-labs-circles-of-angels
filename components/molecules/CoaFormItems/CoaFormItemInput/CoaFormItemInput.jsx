import { Input } from 'antd';
import './coa-form-item-input.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { CoaFormItem } from '../CoaFormItem/CoaFormItem';

export const CoaFormItemInput = ({
  form,
  formItemProps,
  inputProps,
  name,
  errorsToShow,
  fieldDecoratorOptions,
  withErrorFeedback,
  Note
}) => {
  const { getFieldDecorator } = form;
  return (
    <CoaFormItem {...{ formItemProps, withErrorFeedback, errorsToShow, name, form }}>
      {Note}
      {getFieldDecorator(name, {
        ...fieldDecoratorOptions
      })(<Input {...inputProps} />)}
    </CoaFormItem>
  );
};

CoaFormItemInput.defaultProps = {
  form: undefined,
  formItemProps: undefined,
  inputProps: undefined,
  errorsToShow: undefined,
  fieldDecoratorOptions: undefined,
  withErrorFeedback: false,
  Note: undefined
};

CoaFormItemInput.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  formItemProps: PropTypes.objectOf(PropTypes.any),
  inputProps: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string.isRequired,
  errorsToShow: PropTypes.arrayOf(PropTypes.string),
  fieldDecoratorOptions: PropTypes.objectOf(PropTypes.any),
  withErrorFeedback: PropTypes.bool,
  Note: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
