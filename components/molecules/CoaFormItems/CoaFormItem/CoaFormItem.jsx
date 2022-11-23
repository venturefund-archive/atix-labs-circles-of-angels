import { Form } from 'antd';
import classNames from 'classnames';
import { getErrorMessagesField } from 'helpers/utils';
import React from 'react';
import './coa-form-item.scss';
import PropTypes from 'prop-types';

export const CoaFormItem = ({
  children,
  withErrorFeedback,
  form,
  name,
  formItemProps,
  errorsToShow
}) => {
  const { getFieldError } = form;
  const inputError = getFieldError(name) || [];
  const hasErrors = inputError.length > 0;
  return (
    <Form.Item
      {...formItemProps}
      hasFeedback={withErrorFeedback && hasErrors}
      className={classNames(
        'coaFormItem',
        {
          '--withError': hasErrors
        },
        formItemProps?.className
      )}
      help={
        errorsToShow && (
          <>{getErrorMessagesField(inputError, errorsToShow).map(errorMessage => errorMessage)}</>
        )
      }
    >
      {children}
    </Form.Item>
  );
};

CoaFormItem.defaultProps = {
  children: undefined,
  withErrorFeedback: false,
  form: undefined,
  formItemProps: undefined,
  errorsToShow: undefined
};

CoaFormItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  withErrorFeedback: PropTypes.bool,
  form: PropTypes.objectOf(PropTypes.any),
  formItemProps: PropTypes.objectOf(PropTypes.any),
  errorsToShow: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired
};
