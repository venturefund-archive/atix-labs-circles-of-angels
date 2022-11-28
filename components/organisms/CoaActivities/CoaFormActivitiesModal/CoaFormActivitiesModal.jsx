import React from 'react';
import { Form, Input } from 'antd';
import { CoaFormModal } from 'components/organisms/CoaModals/CoaFormModal/CoaFormModal';
import { CoaFormItemTextArea } from 'components/molecules/CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { ERROR_MESSAGES } from 'constants/constants';
import { CoaFormItemInput } from 'components/molecules/CoaFormItems/CoaFormItemInput/CoaFormItemInput';
import { CoaFormItemSelect } from 'components/molecules/CoaFormItems/CoaFormItemSelect/CoaFormItemSelect';
import { onlyAlphanumerics } from 'constants/Regex';
import './coa-form-activities-modal.scss';
import PropTypes from 'prop-types';

export const CoaFormActivitiesModalContent = ({
  form,
  onSave,
  onCancel,
  initialData,
  currency,
  auditors,
  ...rest
}) => (
  <CoaFormModal
    title={initialData ? 'Edit activity' : 'Create new activity'}
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
        placeholder: 'Enter the activity title',
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
        placeholder: 'Enter the activity description',
        maxLength: 500
      }}
    />
    <CoaFormItemTextArea
      form={form}
      name="acceptanceCriteria"
      formItemProps={{ label: 'Acceptance Criteria' }}
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
        initialValue: initialData?.acceptanceCriteria
      }}
      inputTextAreaProps={{
        placeholder: 'Enter the activity acceptance criteria',
        maxLength: 500
      }}
    />
    <div className="coaFormActivitiesModal__budget">
      <CoaFormItemInput
        name="budget"
        form={form}
        formItemProps={{
          label: 'Budget'
        }}
        fieldDecoratorOptions={{
          validateTrigger: 'onSubmit',
          initialValue: initialData?.budget,
          rules: [
            {
              type: 'number',
              message: ERROR_MESSAGES.NUMBER
            }
          ]
        }}
      />
      <Form.Item label="Currency">
        <Input disabled value={currency} />
      </Form.Item>
    </div>
    <CoaFormItemSelect
      name="auditor"
      form={form}
      formItemProps={{ label: 'Auditor', className: 'coaFormActivitiesModal__select' }}
      fieldDecoratorOptions={{
        rules: [
          {
            required: true,
            message: ERROR_MESSAGES.EMPTY
          }
        ],
        validateTrigger: 'onSubmit',
        initialValue: initialData?.auditor?.id
      }}
      selectProps={{
        placeholder: 'Auditor'
      }}
      options={auditors}
    />
  </CoaFormModal>
);

export const CoaFormActivitiesModal = Form.create({ name: 'CoaFormActivitiesModal' })(
  CoaFormActivitiesModalContent
);

CoaFormActivitiesModalContent.defaultProps = {
  form: undefined,
  onSave: undefined,
  onCancel: undefined,
  initialData: undefined,
  currency: undefined,
  auditors: undefined
};

CoaFormActivitiesModalContent.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  initialData: PropTypes.objectOf(PropTypes.any),
  currency: PropTypes.string,
  auditors: PropTypes.objectOf(PropTypes.any)
};
