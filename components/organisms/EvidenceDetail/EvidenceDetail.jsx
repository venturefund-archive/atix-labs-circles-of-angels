import React, { useContext, useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { UserContext } from 'components/utils/UserContext';
import { updateEvidenceStatus } from 'api/activityApi';
import './_style.scss';
import EvidenceComments from 'components/molecules/EvidenceComments/EvidenceComments';
import EvidenceDetailBox from 'components/molecules/EvidenceDetailBox/EvidenceDetailBox';
import GoBack from 'components/atoms/GoBack/GoBack';
import AmountSpent from 'components/molecules/AmountSpent/AmountSpent';
import ModalRejectEvidence from '../ModalRejectEvidence/ModalRejectEvidence';
import ModalApproveEvidence from '../ModalApproveEvidence/ModalApproveEvidence';
import AttachedFiles from '../AttachedFiles/AttachedFiles';

export function Breadcrumb({ milestone, activity, evidence }) {
  return (
    <div className='evidence-breadcrumb'>
      <h2 className='evidence-breadcrumb__title'>
        {milestone} / {activity} / Evidences / {evidence}
      </h2>
    </div>
  )
}

export default function EvidenceDetail({ evidence }) {
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const { user: { id } } = useContext(UserContext);
  const isAuditor = id === evidence?.auditor?.id;
  console.log(isAuditor, id, evidence?.auditor?.id)

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
        <Breadcrumb
          milestone={evidence?.milestone?.title}
          evidence={evidence?.title}
          activity={evidence?.activity?.title}
        />
        <EvidenceDetailBox {...evidence} />
        <AmountSpent amount={evidence?.income} currency={evidence?.currency} />
        {
          evidence?.files?.length ? <AttachedFiles files={evidence?.files} /> : ''
        }
        {/* invert this after ending development */}
        {isAuditor && (
          <div className='auditor-options'>
            <button
              type='button'
              className='auditor-options__auditor-btn auditor-options__auditor-btn--reject'
              onClick={() => setRejectModalOpen(true)}
            >
              <CloseOutlined className='auditor-options__icon' />
              <span>Reject</span>
            </button>
            <button
              type='button'
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
