import React, { useContext, useState } from 'react';
import { UserContext } from 'components/utils/UserContext';
import { updateEvidenceStatus } from 'api/activityApi';
import './_style.scss';
import EvidenceComments from 'components/molecules/EvidenceComments/EvidenceComments';
import EvidenceDetailBox from 'components/molecules/EvidenceDetailBox/EvidenceDetailBox';
import GoBackButton from 'components/atoms/GoBackButton/GoBackButton';
import EvidenceDetailType from 'components/molecules/EvidenceDetailType/EvidenceDetailType';
import { useParams, Link } from 'react-router-dom';
import { Divider } from 'antd';
import ModalRejectEvidence from '../ModalRejectEvidence/ModalRejectEvidence';
import ModalApproveEvidence from '../ModalApproveEvidence/ModalApproveEvidence';
import AttachedFiles from '../AttachedFiles/AttachedFiles';
import Breadcrumb from '../../atoms/BreadCrumb/BreadCrumb';
import CoaRejectButton from '../../atoms/CoaRejectButton/CoaRejectButton';
import CoaApproveButton from '../../atoms/CoaApproveButton/CoaApproveButton';

export default function EvidenceDetail({ evidence, fetchEvidence }) {
  const { projectId, activityId } = useParams();

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  const isAuditor = user.id === evidence?.activity?.auditor?.id;
  const isNewEvidence = evidence.status === 'new';
  const isToReviewActivity = evidence.activityStatus === 'to-review';
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
          {isImpactEvidence && evidence?.files &&
            <>
              <Divider />
              <AttachedFiles files={evidence?.files} />
            </>
          }
          {isTransferEvidence &&
            <>
              <Divider />
              <h5 className="evidenceDetail__container__transaction__title">Transaction</h5>
              <Link
                to={{ pathname: `https://etherscan.io/tx/${transferTxHash}` }}
                target="_blank"
                className="evidenceDetail__container__transaction__hash"
              >
                {transferTxHash}
              </Link>
            </>
          }
          {isAuditor && isNewEvidence && isToReviewActivity && (
            <>
              <Divider />
              <div className="evidenceDetail__container__left__auditorOptions">
                <CoaRejectButton onClick={() => setRejectModalOpen(true)}>Reject</CoaRejectButton>
                <CoaApproveButton disabled={false} onClick={() => setApproveModalOpen(true)}>
                  Approve
                </CoaApproveButton>
              </div>
            </>
          )}
        </div>
        <div className="evidenceDetail__container__right">
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
  );
}
