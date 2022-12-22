import React, { useContext, useState } from 'react';
import { UserContext } from 'components/utils/UserContext';
import { updateEvidenceStatus } from 'api/activityApi';
import './_style.scss';
import EvidenceComments from 'components/molecules/EvidenceComments/EvidenceComments';
import EvidenceDetailBox from 'components/molecules/EvidenceDetailBox/EvidenceDetailBox';
import GoBackButton from 'components/atoms/GoBackButton/GoBackButton';
import EvidenceDetailType from 'components/molecules/EvidenceDetailType/EvidenceDetailType';
import { useHistory, useParams } from 'react-router-dom';
import { Divider } from 'antd';
import ModalRejectEvidence from '../ModalRejectEvidence/ModalRejectEvidence';
import ModalApproveEvidence from '../ModalApproveEvidence/ModalApproveEvidence';
import AttachedFiles from '../AttachedFiles/AttachedFiles';
import Breadcrumb from '../../atoms/BreadCrumb/BreadCrumb';
import CoaRejectButton from '../../atoms/CoaRejectButton/CoaRejectButton';
import CoaApproveButton from '../../atoms/CoaApproveButton/CoaApproveButton';


export default function EvidenceDetail({ evidence, fetchEvidence }) {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { projectId, activityId } = useParams();
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const evidenceStatus = evidence.status;
  const isAuditor = user?.id === evidence?.activity?.auditor?.id;
  const isNewEvidence = evidenceStatus === 'new';

  if(!user && evidenceStatus !=='approved') history.goBack();

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

  const isToReviewActivity = evidence.activityStatus === 'to-review';

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
          {evidence?.files && <AttachedFiles files={evidence?.files} />}
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
