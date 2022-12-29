import React from 'react';
import PropTypes from 'prop-types';
import CoaModal from 'components/atoms/CoaModal/CoaModal';
import { Button, Form, Input, Typography } from 'antd';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { DictionaryContext } from 'components/utils/DictionaryContext';

export const FormModalRejectEvidence = ({ form, visible, setVisible, onSuccess }) => {
  const { texts } = React.useContext(DictionaryContext);
  const { getFieldDecorator } = form;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { comment } = await form.validateFields()
    if (comment) {
      onSuccess(comment)
    }
  }
  return (
    <CoaModal
      visible={visible}
      closable={false}
      maskClosable
      onCancel={() => setVisible(false)}
      footer={[
        <Button
          className='ant-btn ant-btn-secondary CoaModal__Secondary'
          onClick={() => setVisible(false)}
        >
          {texts?.general?.btnCancel || 'Cancel'}
        </Button>,
        <Button
          className='ant-btn ant-btn-primary CoaModal__primary'
          onClick={handleSubmit}
        >
          {texts?.general?.btnReject || 'Reject'}
        </Button>
      ]}
    >
      <LogoWrapper textTitle='You are about to reject an evidence' />
      <Typography.Text className='CoaModal__Paragraph--centered'>
        {texts?.modalRejectEvidence?.leaveComment || 'Please select the reason and leave a comment for the beneficiary or the founder.'}
      </Typography.Text>
      <Form onSubmit={handleSubmit}>
        <Form.Item label={texts?.modalRejectEvidence?.textPlaceholder || 'Leave a comment'}>
          {
            getFieldDecorator(texts?.modalRejectEvidence?.comment || 'comment', {
              rules: [
                {
                  required: true,
                  message: texts?.modalRejectEvidence?.ruleComment || 'Must write a reason for rejection'
                }
              ]
            })(
              <Input.TextArea rows={5} />
            )
          }
        </Form.Item>
      </Form>
    </CoaModal>
  )
}

const ModalRejectEvidence = Form.create({ name: 'RejectEvidence' })(FormModalRejectEvidence)
export default ModalRejectEvidence
