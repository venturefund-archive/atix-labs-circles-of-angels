import React from 'react';
import { Radio } from 'antd';
import classNames from 'classnames';
import { CoaFormItem } from '../CoaFormItem/CoaFormItem';
import './coa-form-item-radio-button.scss';

export const CoaFormItemRadioButton = ({
  form,
  name,
  formItemProps,
  withErrorFeedback,
  errorsToShow,
  fieldDecoratorOptions,
  options,
  radioGroupProps,
  type
}) => {
  const { getFieldDecorator } = form;
  return (
    <CoaFormItem
      {...{
        formItemProps,
        withErrorFeedback,
        errorsToShow,
        name,
        form
      }}
    >
      {getFieldDecorator(name, {
        ...fieldDecoratorOptions
      })(
        <Radio.Group
          placeholder="Type"
          {...{
            className: classNames('m-coaFormItem__radioGroup', {
              [`--type${type}`]: type
            }),
            radioGroupProps
          }}
        >
          {options?.map(({ value, label }) => (
            <Radio value={value} key={value}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      )}
    </CoaFormItem>
  );
};
