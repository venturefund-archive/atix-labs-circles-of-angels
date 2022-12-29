import React from 'react';
import { Form } from 'antd';
import TitlePage from 'components/atoms/TitlePage/TitlePage';
import { CoaFormItemTextArea } from 'components/molecules/CoaFormItems/CoaFormItemTextArea/CoaFormItemTextArea';
import { CoaFormModal } from '../CoaModals/CoaFormModal/CoaFormModal';

export const FormModalRejectEvidence = ({ form, visible, setVisible, onSuccess }) => {
  return (
    <CoaFormModal
      form={form}
      visible={visible}
      onCancel={() => setVisible(false)}
      okText="Reject"
      onSave={({ comment }) => onSuccess(comment)}
      buttonsPosition="center"
      withLogo
      title={
        <TitlePage
          centeredText
          textTitle="You are about to reject an evidence"
          underlinePosition="none"
          textColor="#4C7FF7"
        />
      }
      description="Please select the reason and leave a comment for the beneficiary or the founder."
    >
      <Form>
        <CoaFormItemTextArea
          form={form}
          formItemProps={{
            label: 'Leave a comment'
          }}
          name="comment"
          fieldDecoratorOptions={{
            rules: [
              {
                required: true,
                message: 'Must write a reason for rejection'
              }
            ]
          }}
          inputTextAreaProps={{
            rows: 5
          }}
        />
      </Form>
    </CoaFormModal>
  );
};

const ModalRejectEvidence = Form.create({ name: 'RejectEvidence' })(FormModalRejectEvidence);
export default ModalRejectEvidence;
