import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { CoaFormItem } from '../CoaFormItem/CoaFormItem';

export const CoaFormItemPassword = ({
  form,
  formItemProps,
  inputProps,
  name,
  errorsToShow,
  fieldDecoratorOptions,
  withErrorFeedback
}) => {
  const { getFieldDecorator } = form;
  return (
    <CoaFormItem {...{ formItemProps, withErrorFeedback, errorsToShow, name, form }}>
      {getFieldDecorator(name, {
        ...fieldDecoratorOptions
      })(<Input.Password {...inputProps} />)}
    </CoaFormItem>
  );
};

CoaFormItemPassword.defaultProps = {
  form: undefined,
  formItemProps: undefined,
  inputProps: undefined,
  errorsToShow: undefined,
  fieldDecoratorOptions: undefined,
  withErrorFeedback: false
};

CoaFormItemPassword.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  formItemProps: PropTypes.objectOf(PropTypes.any),
  inputProps: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string.isRequired,
  errorsToShow: PropTypes.arrayOf(PropTypes.string),
  fieldDecoratorOptions: PropTypes.objectOf(PropTypes.any),
  withErrorFeedback: PropTypes.bool
};
