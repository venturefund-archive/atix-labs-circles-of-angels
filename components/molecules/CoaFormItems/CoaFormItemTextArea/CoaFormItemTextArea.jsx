import { Input } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CoaFormItem } from '../CoaFormItem/CoaFormItem';
import './coa-form-item-text-area.scss';

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
  const [charsLength, setCharsLength] = useState(fieldDecoratorOptions?.initialValue?.length || 0);
  return (
    <CoaFormItem {...{ formItemProps, withErrorFeedback, errorsToShow, name, form }}>
      {Note}
      {getFieldDecorator(name, {
        ...fieldDecoratorOptions
      })(
        <Input.TextArea
          {...inputTextAreaProps}
          className={classNames(inputTextAreaProps?.className, 'm-coaFormItemTextArea__textArea')}
          onChange={e => setCharsLength(e.target.value?.length)}
        />
      )}
      {inputTextAreaProps?.showCount && (
        <span className="m-coaFormItemTextArea__counter">{`${charsLength}/${inputTextAreaProps?.maxLength}`}</span>
      )}
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
