import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { CoaFormItemTextArea } from 'components/molecules/CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { CoaDialogModal } from 'components/organisms/CoaModals/CoaDialogModal/CoaDialogModal';
import { ERROR_MESSAGES } from 'constants/constants';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaFormItemInput } from 'components/molecules/CoaFormItems/CoaFormItemInput/CoaFormItemInput';

export const CoaFormMilestoneModalContent = ({ form, onSave, onCancel, initialData, ...rest }) => (
  <CoaDialogModal
    title={
      <TitlePage
        textTitle={initialData ? 'Edit milestone' : 'Create new milestone'}
        underlinePosition="left"
      />
    }
    {...{ form, onSave, onCancel }}
    width={800}
    {...rest}
  >
    <CoaFormItemInput
      form={form}
      name="title"
      formItemProps={{ label: 'Title' }}
      fieldDecoratorOptions={{
        rules: [
          {
            required: true,
            message: ERROR_MESSAGES.EMPTY,
            whitespace: true
          }
        ],
        validateTrigger: 'onSubmit',
        initialValue: initialData?.title
      }}
      inputProps={{
        placeholder: 'Enter the milestone title',
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
          }
        ],
        validateTrigger: 'onSubmit',
        initialValue: initialData?.description
      }}
      inputTextAreaProps={{
        placeholder: 'Enter the milestone description',
        maxLength: 500,
        showCount: true
      }}
    />
  </CoaDialogModal>
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
