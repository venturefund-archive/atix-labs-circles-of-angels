import { Form } from 'antd';
import { CoaFormItemTextArea } from 'components/molecules/CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { CoaFormModal } from 'components/organisms/CoaModals/CoaFormModal/CoaFormModal';
import { ERROR_MESSAGES } from 'constants/constants';
import { onlyAlphanumerics } from 'constants/Regex';
import React from 'react';

export const CoaFormMilestoneModalContent = ({ form, onSave, onCancel, initialData, ...rest }) => {
  return (
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
};

export const CoaFormMilestoneModal = Form.create({ name: 'CoaFormMilestoneModal' })(
  CoaFormMilestoneModalContent
);
