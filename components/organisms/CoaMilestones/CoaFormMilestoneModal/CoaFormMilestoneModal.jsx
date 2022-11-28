import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { CoaFormItemTextArea } from 'components/molecules/CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { CoaFormModal } from 'components/organisms/CoaModals/CoaFormModal/CoaFormModal';
import { ERROR_MESSAGES } from 'constants/constants';
import { onlyAlphanumerics } from 'constants/Regex';

export const CoaFormMilestoneModalContent = ({ form, onSave, onCancel, initialData, ...rest }) => (
  <CoaFormModal
    title={initialData ? 'Edit milestone' : 'Create new milestone'}
    {...{ form, onSave, onCancel }}
    {...rest}
  >
    <CoaFormItemTextArea
      form={form}
      name="title"
      formItemProps={{ label: 'Title' }}
      fieldDecoratorOptions={{
        rules: [
          {
            required: true,
            message: ERROR_MESSAGES.EMPTY,
            whitespace: true
          },
          {
            pattern: onlyAlphanumerics,
            message: ERROR_MESSAGES.ALPHANUMERIC
          }
        ],
        validateTrigger: 'onSubmit',
        initialValue: initialData?.title
      }}
      inputTextAreaProps={{
        placeholder: 'Enter the milestone title',
        maxLength: 50
      }}
    />
    <CoaFormItemTextArea
      form={form}
      name="description"
      formItemProps={{ label: 'Description' }}
      fieldDecoratorOptions={{
        rules: [
          {
            required: true,
            message: ERROR_MESSAGES.EMPTY,
            whitespace: true
          },
          {
            pattern: onlyAlphanumerics,
            message: ERROR_MESSAGES.ALPHANUMERIC
          }
        ],
        validateTrigger: 'onSubmit',
        initialValue: initialData?.description
      }}
      inputTextAreaProps={{
        placeholder: 'Enter the milestone title',
        maxLength: 500
      }}
    />
  </CoaFormModal>
);

export const CoaFormMilestoneModal = Form.create({ name: 'CoaFormMilestoneModal' })(
  CoaFormMilestoneModalContent
);

CoaFormMilestoneModalContent.defaultProps = {
  form: undefined,
  onSave: undefined,
  onCancel: undefined,
  initialData: undefined
};

CoaFormMilestoneModalContent.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  initialData: PropTypes.objectOf(PropTypes.any)
};
