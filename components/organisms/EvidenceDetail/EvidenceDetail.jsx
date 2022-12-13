import React, { useContext, useState } from 'react';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, PaperClipOutlined } from '@ant-design/icons';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { useHistory } from 'react-router';
import evidenceStatusMap from 'model/evidenceStatus';
import { UserContext } from 'components/utils/UserContext';
import CoaModal from 'components/atoms/CoaModal/CoaModal';
import { Button, Form, Input, Typography } from 'antd';
import LogoWrapper from 'components/atoms/LogoWrapper';
import { updateEvidenceStatus } from 'api/activityApi';
import './_style.scss';

export function GoBack() {
  const history = useHistory()
  return (
    <button
      className='go-back'
      type='button'
      onClick={() => history.goBack()}>
      <ArrowLeftOutlined />
      <h3 className='go-back__text'>Go back</h3>
    </button>
  )
}

export function EvidenceComments({ reason, auditor }) {
  return (
    <div className='evidence-comments'>
      <h2 className='evidence-comments__header'>
        Auditor&apos;s Review Comments
      </h2>
      {!reason && (
        <div className='evidence-comments__no-comments'>
          <img
            className='evidence-comments__image'
            src='/static/images/no-comments.svg' alt='no comments' />
          <h3 className='evidence-comments__message'>
            No activities on the blockchain yet
          </h3>
        </div>
      )}
      {reason && (
        <div className='evidence-comments__reason'>
          <img src='/static/images/audit-comment.svg' />
          <div className='evidence-comments__commentary'>
            <div className='evidence-comments__top'>
              <h3 className='evidence-comments__auditor-name'>
                {auditor?.firstName} {auditor?.lastName}
              </h3>
              {/* Await for commentary date integration
              <h3 className='evidence-comments__date'>
                25/09/2022
              </h3>
                */}
            </div>
            <p className='evidence-comments__text'>
              {reason}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

export function EvidenceDetailContainer({
  title,
  description,
  createdAt,
  beneficiary,
  status,
}) {
  const date = new Date(createdAt)
  return (
    <div className='evidence-container'>
      {/* Evidence header */}
      <div className='evidence-container__header'>
        <h3 className='evidence-container__date'>
          {date.toLocaleDateString('en-us', { month: 'long' })},
          {date.toLocaleDateString('en-us', { day: 'numeric' })} -
          {date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })}
        </h3>
        {
          status &&
          <CoaTag predefinedColor={evidenceStatusMap[status].color}>
            {
              evidenceStatusMap[status].name
            }
          </CoaTag>
        }
      </div>
      { /* Evidence indicator */}
      <h3 className='evidence-container__indicator'>EVIDENCE</h3>
      { /* Evidence title */}
      <h2 className='evidence-container__title'>
        {title}
      </h2>
      <p className='evidence-container__description'>
        {description}
      </p>
      {/* Evidence creator */}
      <h3 className='evidence-container__created-by'>
        Created by <b className='evidence-container__creator-name'>
          {beneficiary?.firstName} {beneficiary?.lastName}
        </b>
      </h3>
    </div>
  )
}

// Move to organisms
export const ModalApproveEvidence = ({ visible, setVisible, onSuccess }) => {
  return (
    <CoaModal
      visible={visible}
      closable={false}
      maskClosable={true}
      onCancel={() => setVisible(false)}
      footer={[
        <Button
          className='ant-btn ant-btn-secondary CoaModal__Secondary'
          onClick={() => setVisible(false)}
        >
          Cancel
        </Button>,
        <Button className='ant-btn ant-btn-primary CoaModal__primary' onClick={onSuccess}>
          Approve
        </Button>
      ]}
    >
      <LogoWrapper textTitle='You are about to approve an evidence' />
      <Typography.Text className='CoaModal__Paragraph--centered'>Are you sure you want to approve the following evidence?</Typography.Text>
    </CoaModal>
  )
}

export const FormModalRejectEvidence = ({ form, visible, setVisible, onSuccess }) => {
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
      maskClosable={true}
      onCancel={() => setVisible(false)}
      footer={[
        <Button
          className='ant-btn ant-btn-secondary CoaModal__Secondary'
          onClick={() => setVisible(false)}
        >
          Cancel
        </Button>,
        <Button
          className='ant-btn ant-btn-primary CoaModal__primary'
          onClick={handleSubmit}
        >
          Approve
        </Button>
      ]}
    >
      <LogoWrapper textTitle='You are about to reject an evidence' />
      <Typography.Text className='CoaModal__Paragraph--centered'>
        Please select the reason and leave a comment for the beneficiary or the founder.
      </Typography.Text>
      <Form onSubmit={handleSubmit}>
        <Form.Item label='Leave a comment'>
          {
            getFieldDecorator('comment', {
              rules: [
                {
                  required: true,
                  message: 'Must write a reason for rejection'
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

export function AttachedFiles({ files }) {
  return (
    <div className='attached-files'>
      <h2 className='attached-files__header'>Attached Files</h2>
      {
        files && files.map((file) => (
          <div className='attached-files__file' key={file.name}>
            <div className='attached-files__file-left'>
              <PaperClipOutlined />
              <h4 className='attached-files__file-title'>{file.name}</h4>
            </div>
            <a
              className='attached-files__file-download'
              href={`${process.env.NEXT_PUBLIC_URL_HOST}${file.path}`}
              target="_blank"
              download
            >
              Download
            </a>
          </div>
        ))
      }
    </div>
  )
}

export function AmountSpent({ currency, amount }) {
  return (
    <div className='amount-spent'>
      <div className='amount-spent__left'>
        <div className='amount-spent__symbol'>
          <p>$</p>
        </div>
        <h3 className='amount-spent__legend'>Amount Spent</h3>
      </div>
      <div className='amount-spent__right'>
        <h4 className='amount-spent__amount'>{amount} {currency}</h4>
      </div>
    </div>
  )
}

export function Breadcrumb({ route }) {
  return (
    <div className='evidence-breadcrumb'>
      <h2 className='evidence-breadcrumb__title'>{route.title}</h2>
    </div>
  )
}

export default function EvidenceDetail({ evidence }) {
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const { user: { id } } = useContext(UserContext);
  const isAuditor = id == evidence?.auditor?.id;

  const rejectEvidence = async (reason) => {
    const result = await updateEvidenceStatus(evidence.id, 'rejected', reason);
    if (!result.errors) {
      setRejectModalOpen(false);
    }
  }

  const approveEvidence = async () => {
    const result = await updateEvidenceStatus(evidence.id, 'approved')
    if (!result.errors) {
      setApproveModalOpen(false);
    }
  }

  return (
    <div className='evidence-detail'>
      <div className='evidence-detail__container'>
        <GoBack />
        <Breadcrumb route={{ title: 'Evidence Details' }} />
        <EvidenceDetailContainer {...evidence} />
        <AmountSpent amount={evidence?.income} currency={evidence?.currency} />
        {
          evidence?.files && <AttachedFiles files={evidence?.files} />
        }
        {/* invert this after ending development */}
        {isAuditor && (
          <div className='auditor-options'>
            <button
              className='auditor-options__auditor-btn auditor-options__auditor-btn--reject'
              onClick={() => setRejectModalOpen(true)}
            >
              <CloseOutlined className='auditor-options__icon' />
              <span>Reject</span>
            </button>
            <button
              className='auditor-options__auditor-btn'
              onClick={() => setApproveModalOpen(true)}
            >
              <CheckOutlined className='auditor-options__icon' />
              <span>Approve</span>
            </button>
          </div>
        )}
      </div>
      <div className='evidence-detail__container'>
        <EvidenceComments {...evidence} />
      </div>
      <ModalApproveEvidence visible={approveModalOpen} setVisible={setApproveModalOpen} onSuccess={approveEvidence} />
      <ModalRejectEvidence visible={rejectModalOpen} setVisible={setRejectModalOpen} onSuccess={reason => rejectEvidence(reason)} />
    </div>
  )
}
