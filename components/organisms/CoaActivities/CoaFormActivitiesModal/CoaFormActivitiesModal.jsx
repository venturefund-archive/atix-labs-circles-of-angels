import React from 'react';
import { Form, Input } from 'antd';
import { CoaDialogModal } from 'components/organisms/CoaModals/CoaDialogModal/CoaDialogModal';
import { CoaFormItemTextArea } from 'components/molecules/CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { ERROR_MESSAGES } from 'constants/constants';
import { CoaFormItemSelect } from 'components/molecules/CoaFormItems/CoaFormItemSelect/CoaFormItemSelect';
import { onlyAlphanumerics } from 'constants/Regex';
import './coa-form-activities-modal.scss';
import PropTypes from 'prop-types';
import { CoaFormItem } from 'components/molecules/CoaFormItems/CoaFormItem/CoaFormItem';
import { CoaFormItemInputNumber } from 'components/molecules/CoaFormItems/CoaFormItemInputNumber/CoaFormItemInputNumber';
import TitlePage from 'components/atoms/TitlePage/TitlePage';

export const CoaFormActivitiesModalContent = ({
  form,
  onSave,
  onCancel,
  initialData,
  currency,
  auditors,
  ...rest
}) => (
  <CoaDialogModal
    title={
      <TitlePage
        textTitle={initialData ? 'Edit activity' : 'Create new activity'}
        underlinePosition="left"
      />
    }
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
        maxLength: 50,
        showCount: true
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
        maxLength: 500,
        showCount: true
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
        maxLength: 500,
        showCount: true
      }}
    />
    <div className="coaFormActivitiesModal__budget">
      <CoaFormItemInputNumber
        name="budget"
        form={form}
        formItemProps={{
          label: 'Budget',
          className: 'coaFormActivitiesModal__budget__formItem'
        }}
        fieldDecoratorOptions={{
          validateTrigger: 'onSubmit',
          initialValue: initialData?.budget
        }}
        inputNumberProps={{
          step: '0.1'
        }}
      />
      <CoaFormItem
        formItemProps={{
          label: 'Currency'
        }}
      >
        <Input disabled value={currency} />
      </CoaFormItem>
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
  </CoaDialogModal>
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
