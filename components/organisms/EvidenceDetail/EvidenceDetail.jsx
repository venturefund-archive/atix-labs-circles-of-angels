import React, { useContext, useState } from 'react';
import { UserContext } from 'components/utils/UserContext';
import { updateEvidenceStatus } from 'api/activityApi';
import './_style.scss';
import EvidenceDetailBox from 'components/molecules/EvidenceDetailBox/EvidenceDetailBox';
import GoBackButton from 'components/atoms/GoBackButton/GoBackButton';
import EvidenceDetailType from 'components/molecules/EvidenceDetailType/EvidenceDetailType';
import { useParams, Redirect } from 'react-router-dom';
import { Divider } from 'antd';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import ModalRejectEvidence from '../ModalRejectEvidence/ModalRejectEvidence';
import ModalApproveEvidence from '../ModalApproveEvidence/ModalApproveEvidence';
import AttachedFiles from '../AttachedFiles/AttachedFiles';
import Breadcrumb from '../../atoms/BreadCrumb/BreadCrumb';
import CoaRejectButton from '../../atoms/CoaRejectButton/CoaRejectButton';
import CoaApproveButton from '../../atoms/CoaApproveButton/CoaApproveButton';
import { CoaChangelogContainer } from '../CoaChangelogContainer/CoaChangelogContainer';
import TransactionLink from '../../molecules/TransactionLink/TransactionLink';

export default function EvidenceDetail({ evidence, fetchEvidence, currency }) {
  const { user } = useContext(UserContext);
  const { projectId, activityId, detailEvidenceId } = useParams();
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const { texts } = React.useContext(DictionaryContext);

  const evidenceStatus = evidence.status;
  const isAuditor = user?.id === evidence?.activity?.auditor?.id;
  const isNewEvidence = evidenceStatus === 'new';

  if (!user && evidenceStatus !== 'approved')
    return <Redirect to={`/${projectId}/activity/${activityId}/evidences`} />;

  const isImpactEvidence = evidence.type === 'impact';
  const isTransferEvidence = evidence.type === 'transfer';
  const { transferTxHash } = evidence;

  const rejectEvidence = async reason => {
    const result = await updateEvidenceStatus(evidence.id, 'rejected', reason);
    if (!result.errors) {
      setRejectModalOpen(false);
      await fetchEvidence(evidence.id);
    }
  };

  const approveEvidence = async () => {
    const result = await updateEvidenceStatus(evidence.id, 'approved', '');
    if (!result.errors) {
      setApproveModalOpen(false);
      await fetchEvidence(evidence.id);
    }
  };

  return (
    <div className="evidenceDetail">
      <GoBackButton goBackTo={`/${projectId}/activity/${activityId}/evidences`} />
      <Breadcrumb
        route={`${evidence?.milestone?.title} / ${evidence?.activity?.title} / ${evidence?.title}`}
      />
      <div className="evidenceDetail__container">
        <div className="evidenceDetail__container__left">
          <EvidenceDetailBox {...evidence} />
          <EvidenceDetailType
            evidenceType={evidence?.type}
            income={evidence?.income}
            outcome={evidence?.outcome}
            currency={evidence?.currency}
          />
          {isImpactEvidence && evidence?.files && (
            <>
              <Divider />
              <AttachedFiles files={evidence?.files} />
            </>
          )}
          {isTransferEvidence && (
            <>
              <Divider />
              <TransactionLink showTitle txHash={transferTxHash} currency={evidence?.currency} />
            </>
          )}

          {isAuditor && isNewEvidence && (
            <>
              <Divider />
              <div className="evidenceDetail__container__left__auditorOptions">
                <CoaRejectButton onClick={() => setRejectModalOpen(true)}>
                  {texts?.general?.btnReject || 'Reject'}
                </CoaRejectButton>
                <CoaApproveButton disabled={false} onClick={() => setApproveModalOpen(true)}>
                  {texts?.general?.btnApprove || 'Approve'}
                </CoaApproveButton>
              </div>
            </>
          )}
        </div>
        <div className="evidenceDetail__container__right">
          <CoaChangelogContainer
            projectId={projectId}
            activity={activityId}
            evidenceId={detailEvidenceId}
            title={ texts?.changelog?.evidence || 'Evidence Changelog'}
            currency={currency}
          />
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
  );
}
