import React, { useContext, useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { UserContext } from 'components/utils/UserContext';
import { updateEvidenceStatus } from 'api/activityApi';
import './_style.scss';
import EvidenceComments from 'components/molecules/EvidenceComments/EvidenceComments';
import EvidenceDetailBox from 'components/molecules/EvidenceDetailBox/EvidenceDetailBox';
import GoBackButton from 'components/atoms/GoBackButton/GoBackButton';
import AmountSpent from 'components/molecules/AmountSpent/AmountSpent';
import { useParams } from 'react-router-dom';
import ModalRejectEvidence from '../ModalRejectEvidence/ModalRejectEvidence';
import ModalApproveEvidence from '../ModalApproveEvidence/ModalApproveEvidence';
import AttachedFiles from '../AttachedFiles/AttachedFiles';
import Breadcrumb from '../../atoms/BreadCrumb/BreadCrumb';

export default function EvidenceDetail({ evidence }) {
  const { projectId, activityId } = useParams();

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const { user: { id } } = useContext(UserContext);
  const isAuditor = id === evidence?.auditor?.id;

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
    <div className='evidenceDetail'>
      <GoBackButton goBackTo={`/${projectId}/activity/${activityId}/evidences`}/>
      <Breadcrumb route={`${evidence?.milestone?.title}/${evidence?.activity?.title}/${evidence?.title}`} />
      <div className='evidenceDetail__container'>
        <div className='evidenceDetail__container__left'>
          <EvidenceDetailBox {...evidence} />
          <AmountSpent amount={evidence?.income} currency={evidence?.currency} />
          {
            evidence?.files && <AttachedFiles files={evidence?.files} />
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
        <div className='evidenceDetail__container__right'>
          <EvidenceComments {...evidence} />
        </div>
      </div>
      <ModalApproveEvidence
        visible={approveModalOpen}
        setVisible={setApproveModalOpen}
        onSuccess={approveEvidence}
      />
      <ModalRejectEvidence
        visible={rejectModalOpen}
        setVisible={setRejectModalOpen}
        onSuccess={reason => rejectEvidence(reason)}
      />
    </div>
  )
}
