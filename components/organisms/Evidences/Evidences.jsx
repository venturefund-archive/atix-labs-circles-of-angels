import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { message } from 'antd';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { UserContext } from 'components/utils/UserContext';
import activityStatusMap, { ACTIVITY_STATUS_ENUM } from 'model/activityStatus';
import GoBackButton from 'components/atoms/GoBackButton/GoBackButton';
import { useHistory, useParams } from 'react-router-dom';
import { isBeneficiaryOrInvestor, isProjectAuditor } from 'helpers/roles';
import CoaRejectButton from 'components/atoms/CoaRejectButton/CoaRejectButton';
import CoaApproveButton from 'components/atoms/CoaApproveButton/CoaApproveButton';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import EvidenceCard from '../../atoms/EvidenceCard/EvidenceCard';
import EvidenceFormFooter from '../../atoms/EvidenceFormFooter/EvidenceFormFooter';
import { getActivityEvidences, updateActivityStatus } from '../../../api/activityApi';
import Loading from '../../molecules/Loading/Loading';
import ModalConfirmWithSK from '../ModalConfirmWithSK/ModalConfirmWithSK';
import ModalPublishLoading from '../ModalPublishLoading/ModalPublishLoading';
import ModalEvidencesReviewSuccess from '../ModalEvidencesReviewSuccess/ModalEvidencesReviewSuccess';
import { canAddEvidences } from '../../../helpers/canAddEvidence';
import { AddEvidenceButton } from '../../atoms/AddEvidenceButton/AddEvidenceButton';

const initialSecretKeyModal = {
  visible: false,
  title: '',
  onSuccessAction: null
};

const Evidences = ({ project }) => {
  const history = useHistory();
  const { id: projectId, activityId } = useParams();

  const [secretKeyModal, setSecretKeyModal] = useState(initialSecretKeyModal);
  const [evidences, setEvidences] = useState([]);
  const [milestone, setMilestone] = useState({});
  const [activity, setActivity] = useState({});
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [reviewSuccessVisible, setReviewSuccessVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const activityStatus = activity?.status;

  useEffect(() => {
    const getEvidences = async _activity => {
      setLoading(true);
      const response = await getActivityEvidences(_activity);
      if (response.errors || !response.data) {
        message.error('An error occurred while fetching the project');
        return;
      }

      setEvidences(response.data.evidences);
      setActivity(response.data.activity);
      setMilestone(response.data.milestone);
      setLoading(false);
    };

    getEvidences(activityId);

    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading></Loading>;

  const isAuditor = isProjectAuditor(user, projectId);

  const sendToReview = async () => {
    setSecretKeyModal(initialSecretKeyModal);
    setLoadingModalVisible(true);
    setSecretKeyModal(initialSecretKeyModal);
    const result = await updateActivityStatus(activityId, 'to-review', 'transactionID-mocked');
    if (!result.errors) {
      setLoadingModalVisible(false);
      setReviewSuccessVisible(true);
    } else {
      setLoadingModalVisible(false);
    }
  };

  const sendActivityToReject = async () => {
    setSecretKeyModal(initialSecretKeyModal);
    setLoadingModalVisible(true);
    const result = await updateActivityStatus(activityId, 'rejected');
    setLoadingModalVisible(false);
    if (!result.errors) return;
    message.error('An error occurred while rejecting the activity');
  };

  const sendActivityToApprove = async () => {
    setSecretKeyModal(initialSecretKeyModal);
    setLoadingModalVisible(true);
    const result = await updateActivityStatus(activityId, 'approved');
    setLoadingModalVisible(false);
    if (!result.errors) return;
    message.error('An error occurred while approving the activity');
  };

  const areReviewedEvidences =
    evidences.length > 0 &&
    evidences.every(({ status }) => ['approved', 'rejected'].includes(status));

  const enableAddEvidenceBtn = canAddEvidences(user, projectId);

  return (
    <>
      <div className="container">
        <GoBackButton goBackTo={`/${projectId}`} />
        <div className="evidences">
          <div className="evidencesHeader">
            <span className="evidencesHeaderDesktop">
              {milestone.title} / {activity.title} / Evidences
            </span>
            <span className="evidencesHeaderMobile">Evidences</span>
          </div>
          <div className="evidencesCardInfoMobile">
            <p>{activity.title}</p>
          </div>
          <div className="evidencesCard">
            <div className="cardInfo">
              <p>
                <span>{activity.title}</span>
              </p>
              <div className="evidenceStatus">
                {enableAddEvidenceBtn && (
                  <AddEvidenceButton
                    onClickAddEvidence={e => {
                      e.stopPropagation();
                      history.push(`/${projectId}/activity/${activity?.id}/create-evidence`);
                    }}
                    responsiveLayout={false}
                  />
                )}
                <CoaTag predefinedColor={activityStatusMap?.[activityStatus]?.color}>
                  {activityStatusMap?.[activityStatus]?.name}
                </CoaTag>
              </div>
            </div>
            <div className="evidenceCards">
              {evidences.map((evidence, index) => (
                <EvidenceCard
                  key={evidence.id}
                  evidenceNumber={evidences.length - index}
                  evidence={evidence}
                  currency={project?.details?.currency}
                />
              ))}
            </div>
            {isBeneficiaryOrInvestor(user, projectId) && (
              <CoaButton
                type="primary"
                disabled={
                  !areReviewedEvidences || activityStatus === ACTIVITY_STATUS_ENUM.TO_REVIEW
                }
                onClick={() =>
                  setSecretKeyModal({
                    visible: true,
                    title: 'You are about to send an activity to be reviewed by an auditor',
                    onSuccessAction: sendToReview
                  })
                }
              >
                Send for review
              </CoaButton>
            )}
            {isAuditor && (
              <div>
                <CoaRejectButton
                  disabled={!areReviewedEvidences}
                  onClick={() =>
                    setSecretKeyModal({
                      visible: true,
                      title: 'Are you sure you want to reject the activity?',
                      onSuccessAction: sendActivityToReject
                    })
                  }
                >
                  Reject
                </CoaRejectButton>
                <CoaApproveButton
                  disabled={!areReviewedEvidences}
                  onClick={() =>
                    setSecretKeyModal({
                      visible: true,
                      title: 'Are you sure you want to approve the activity?',
                      onSuccessAction: sendActivityToApprove
                    })
                  }
                >
                  Approve
                </CoaApproveButton>
              </div>
            )}
          </div>
        </div>
      </div>
      {user && (
        <>
          <ModalConfirmWithSK
            visible={secretKeyModal.visible}
            title={secretKeyModal.title}
            onCancel={() => setSecretKeyModal(initialSecretKeyModal)}
            onSuccess={secretKeyModal.onSuccessAction}
          />
          <ModalPublishLoading visible={loadingModalVisible} />
          <ModalEvidencesReviewSuccess
            visible={reviewSuccessVisible}
            onCancel={() => setReviewSuccessVisible(false)}
          />
        </>
      )}
      <EvidenceFormFooter />
    </>
  );
};

Evidences.defaultProps = {
  project: undefined
};

Evidences.propTypes = {
  project: PropTypes.objectOf(PropTypes.any)
};

export default Evidences;
