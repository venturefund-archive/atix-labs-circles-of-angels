import { Select } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { CoaFormItem } from '../CoaFormItem/CoaFormItem';
import './coa-form-item-select.scss';

const { Option } = Select;

export const CoaFormItemSelect = ({
  form,
  selectProps,
  fieldDecoratorOptions,
  name,
  errorsToShow,
  formItemProps,
  options,
  withErrorFeedback
}) => {
  const { getFieldDecorator } = form;
  return (
    <CoaFormItem {...{ formItemProps, withErrorFeedback, errorsToShow, name, form }}>
      {getFieldDecorator(name, {
        ...fieldDecoratorOptions
      })(
        <Select placeholder="Type" {...selectProps}>
          {options?.map(({ value, label }) => (
            <Option value={value} key={value}>
              {label}
            </Option>
          ))}
        </Select>
      )}
    </CoaFormItem>
  );
};

CoaFormItemSelect.defaultProps = {
  form: undefined,
  formItemProps: undefined,
  selectProps: undefined,
  errorsToShow: undefined,
  fieldDecoratorOptions: undefined,
  withErrorFeedback: false,
  options: undefined
};

CoaFormItemSelect.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  formItemProps: PropTypes.objectOf(PropTypes.any),
  selectProps: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string.isRequired,
  errorsToShow: PropTypes.arrayOf(PropTypes.string),
  fieldDecoratorOptions: PropTypes.objectOf(PropTypes.any),
  withErrorFeedback: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
};
