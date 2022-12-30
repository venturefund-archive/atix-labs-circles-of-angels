import React from 'react';
import { Form } from 'antd';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaFormItemTextArea } from 'components/molecules/CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaDialogModal } from '../CoaModals/CoaDialogModal/CoaDialogModal';

export const FormModalRejectEvidence = ({ form, visible, setVisible, onSuccess }) => {
  const { texts } = React.useContext(DictionaryContext);
  return (
    <CoaDialogModal
      form={form}
      visible={visible}
      onCancel={() => setVisible(false)}
      cancelText={texts?.general?.btnCancel || 'Cancel'}
      okText={texts?.general?.btnReject || 'Reject'}
      onSave={({ comment }) => onSuccess(comment)}
      buttonsPosition="center"
      withLogo
      title={
        <TitlePage
          centeredText
          textTitle={texts?.modalRejectEvidence?.title || 'You are about to reject an evidence'}
          underlinePosition="none"
          textColor="#4C7FF7"
        />
      }
      description={
        texts?.modalRejectEvidence?.leaveComment ||
        'Please select the reason and leave a comment for the beneficiary or the founder.'
      }
    >
      <Form>
        <CoaFormItemTextArea
          form={form}
          formItemProps={{
            label: texts?.modalRejectEvidence?.textPlaceholder || 'Leave a comment'
          }}
          name="comment"
          fieldDecoratorOptions={{
            rules: [
              {
                required: true,
                message:
                  texts?.modalRejectEvidence?.ruleComment || 'Must write a reason for rejection'
              }
            ]
          }}
          inputTextAreaProps={{
            rows: 5
          }}
        />
      </Form>
    </CoaDialogModal>
  );
};

const ModalRejectEvidence = Form.create({ name: 'RejectEvidence' })(FormModalRejectEvidence);
export default ModalRejectEvidence;
