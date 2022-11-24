import { InputNumber } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { CoaFormItem } from '../CoaFormItem/CoaFormItem';
import './coa-form-item-input-number.scss';

export const CoaFormItemInputNumber = ({
  form,
  fieldDecoratorOptions,
  name,
  errorsToShow,
  formItemProps,
  inputNumberProps,
  withErrorFeedback
}) => {
  const { getFieldDecorator } = form;
  return (
    <CoaFormItem {...{ formItemProps, withErrorFeedback, errorsToShow, name, form }}>
      {getFieldDecorator(name, {
        ...fieldDecoratorOptions
      })(<InputNumber {...inputNumberProps} />)}
    </CoaFormItem>
  );
};

CoaFormItemInputNumber.defaultProps = {
  form: undefined,
  formItemProps: undefined,
  inputNumberProps: undefined,
  errorsToShow: undefined,
  fieldDecoratorOptions: undefined,
  withErrorFeedback: false,
  options: undefined
};

CoaFormItemInputNumber.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  formItemProps: PropTypes.objectOf(PropTypes.any),
  inputNumberProps: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string.isRequired,
  errorsToShow: PropTypes.arrayOf(PropTypes.string),
  fieldDecoratorOptions: PropTypes.objectOf(PropTypes.any),
  withErrorFeedback: PropTypes.bool,
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
