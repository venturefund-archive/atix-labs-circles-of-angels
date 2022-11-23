import React, { useState } from 'react';
import { Upload } from 'antd';
import classNames from 'classnames';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import PropTypes from 'prop-types';
import { CoaFormItem } from '../CoaFormItem/CoaFormItem';
import './coa-form-item-upload.scss';

export const CoaFormItemUpload = ({
  form,
  formItemProps,
  fieldDecoratorOptions,
  name,
  errorsToShow,
  initialValue,
  buttonType,
  uploadProps,
  onChange,
  onRemove,
  Note,
  withErrorFeedback,
  contentContainerClassName,
  buttonContent
}) => {
  const { getFieldDecorator, getFieldError } = form;
  const uploadError = getFieldError(name) || [];
  const hasErrors = uploadError.length > 0;

  const [fileList, setFileList] = useState(initialValue);
  const handleChange = e => {
    const _file = e.file;
    setFileList([_file]);
    onChange(e);
  };

  const handleRemove = () => {
    setFileList([]);
    onRemove();
  };

  return (
    <CoaFormItem
      formItemProps={{ ...formItemProps, valuePropName: 'fileList' }}
      {...{ withErrorFeedback, errorsToShow, name, form }}
    >
      <div className={classNames('coaFormItemUpload__content', contentContainerClassName)}>
        {getFieldDecorator(name, {
          ...fieldDecoratorOptions
        })(
          <Upload
            {...uploadProps}
            onChange={handleChange}
            onRemove={handleRemove}
            fileList={fileList}
          >
            <CoaButton
              type={buttonType}
              className={classNames(
                'coaFormItemUpload__content__button',
                {
                  '--withError': hasErrors
                },
                `--${buttonType}`
              )}
            >
              {buttonContent}
            </CoaButton>
          </Upload>
        )}
        <div className="coaFormItemUpload__content__noteContainer">{Note}</div>
      </div>
    </CoaFormItem>
  );
};

CoaFormItemUpload.defaultProps = {
  form: undefined,
  formItemProps: undefined,
  inputProps: undefined,
  errorsToShow: undefined,
  fieldDecoratorOptions: undefined,
  withErrorFeedback: false,
  initialValue: undefined,
  buttonType: 'primary',
  uploadProps: undefined,
  onChange: undefined,
  onRemove: undefined,
  Note: undefined,
  contentContainerClassName: '',
  buttonContent: undefined
};

CoaFormItemUpload.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  formItemProps: PropTypes.objectOf(PropTypes.any),
  inputProps: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string.isRequired,
  errorsToShow: PropTypes.arrayOf(PropTypes.string),
  fieldDecoratorOptions: PropTypes.objectOf(PropTypes.any),
  withErrorFeedback: PropTypes.bool,
  initialValue: PropTypes.objectOf(PropTypes.any),
  buttonType: PropTypes.string,
  uploadProps: PropTypes.objectOf(PropTypes.any),
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  Note: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  contentContainerClassName: PropTypes.string,
  buttonContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
