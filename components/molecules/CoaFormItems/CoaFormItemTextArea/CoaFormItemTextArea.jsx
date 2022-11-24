import { Input } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { CoaFormItem } from '../CoaFormItem/CoaFormItem';

export const CoaFormItemTextArea = ({
  form,
  formItemProps,
  inputTextAreaProps,
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
      })(<Input.TextArea {...inputTextAreaProps} />)}
    </CoaFormItem>
  );
};

CoaFormItemTextArea.defaultProps = {
  form: undefined,
  formItemProps: undefined,
  inputTextAreaProps: undefined,
  errorsToShow: undefined,
  fieldDecoratorOptions: undefined,
  withErrorFeedback: false,
  Note: undefined
};

CoaFormItemTextArea.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  formItemProps: PropTypes.objectOf(PropTypes.any),
  inputTextAreaProps: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string.isRequired,
  errorsToShow: PropTypes.arrayOf(PropTypes.string),
  fieldDecoratorOptions: PropTypes.objectOf(PropTypes.any),
  withErrorFeedback: PropTypes.bool,
  Note: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
