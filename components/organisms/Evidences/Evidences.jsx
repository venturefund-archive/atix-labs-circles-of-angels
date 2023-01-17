import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { Divider, message } from 'antd';
import { uuid } from 'uuidv4';
import classNames from 'classnames';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { UserContext } from 'components/utils/UserContext';
import activityStatusMap, { ACTIVITY_STATUS_ENUM } from 'model/activityStatus';
import { useHistory } from 'react-router-dom';
import { checkIsActivityAuditor, checkIsBeneficiaryOrInvestorByProject } from 'helpers/roles';
import CoaRejectButton from 'components/atoms/CoaRejectButton/CoaRejectButton';
import CoaApproveButton from 'components/atoms/CoaApproveButton/CoaApproveButton';
import { CoaButton } from 'components/atoms/CoaButton/CoaButton';
import Loading from 'components/molecules/Loading/Loading';
import { sortArrayByDate } from 'components/utils';
import { getUsersByRole } from 'helpers/modules/projectUsers';
import { CoaIndicators } from 'components/molecules/CoaIndicators/CoaIndicators';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { signMessage } from 'helpers/blockchain/wallet';
import EvidenceCard from '../../atoms/EvidenceCard/EvidenceCard';
import { signActivity, updateActivityStatus } from '../../../api/activityApi';
import ModalConfirmWithSK from '../ModalConfirmWithSK/ModalConfirmWithSK';
import ModalPublishLoading from '../ModalPublishLoading/ModalPublishLoading';
import ModalEvidencesReviewSuccess from '../ModalEvidencesReviewSuccess/ModalEvidencesReviewSuccess';
import { canAddEvidences } from '../../../helpers/canAddEvidence';
import { AddEvidenceButton } from '../../atoms/AddEvidenceButton/AddEvidenceButton';
import { ROLES_IDS } from '../AssignProjectUsers/constants';

const initialSecretKeyModal = {
  visible: false,
  title: 'Secret Key',
  onSuccessAction: null,
  leaveAComment: false
};

const initialLoadingModal = {
  state: false,
  title: ''
};

const getAuditorName = (auditorId, project) => {
  const auditors = getUsersByRole(ROLES_IDS.auditor, project?.users);
  const auditor = auditors?.find(_auditor => _auditor?.id === auditorId);
  return `${auditor?.firstName} ${auditor?.lastName}`;
};

const Evidences = ({
  project,
  activity,
  evidences,
  areEvidencesLoading,
  getEvidences,
  getChangelog,
  preview
}) => {
  const history = useHistory();
  const activityId = activity?.id;
  const activityStatus = activity?.status;
  const activityStep = activity?.step;
  const projectId = project?.id;
  const [secretKeyModal, setSecretKeyModal] = useState(initialSecretKeyModal);
  const { texts } = React.useContext(DictionaryContext);

  const [loadingModalVisible, setLoadingModalVisible] = useState(initialLoadingModal);
  const [reviewSuccessVisible, setReviewSuccessVisible] = useState(false);
  const { user } = useContext(UserContext);

  const isActivityAuditor = checkIsActivityAuditor({ user, activity });
  const isBeneficiaryOrInvestor = checkIsBeneficiaryOrInvestorByProject({ user, project });

  const mustSignBeneficiaryOrInvestor =
    activityStep === 1 &&
    isBeneficiaryOrInvestor &&
    activityStatus === ACTIVITY_STATUS_ENUM.TO_REVIEW;
  const mustSignAuditor =
    activityStep === 1 &&
    isActivityAuditor &&
    [ACTIVITY_STATUS_ENUM.APPROVED, ACTIVITY_STATUS_ENUM.REJECTED].includes(activityStatus);

  const [showModalToSignMessage, setShowModalToSignMessage] = useState(
    mustSignBeneficiaryOrInvestor || mustSignAuditor
  );

  const sendToReview = useCallback(
    async (_pin, _password, wallet, key) => {
      setSecretKeyModal(initialSecretKeyModal);
      setLoadingModalVisible({
        state: true,
        title: texts?.modalPublishLoading?.sent || 'The activity is being sent'
      });
      setSecretKeyModal(initialSecretKeyModal);
      const result = await updateActivityStatus(activityId, 'to-review', `${uuid()}-mocked`);
      if (result.errors) {
        message.error('An error occurred while sending to review the activity');
        setLoadingModalVisible({ ...loadingModalVisible, state: false });
        return;
      }

      const messageToSign = JSON.stringify(result?.data?.toSign);

      try {
        const authorizationSignature = await signMessage(wallet, messageToSign, key);
        const response = await signActivity({ authorizationSignature, activityId });
        if (response.errors) {
          throw new Error(response.errors);
        }
        setReviewSuccessVisible(true);
        getEvidences(activityId);
        getChangelog();
        setLoadingModalVisible({ ...loadingModalVisible, state: false });
      } catch (error) {
        message.error('An error occurred while sending to review the activity');
        history.push(`/${projectId}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activityId, getChangelog, getEvidences, loadingModalVisible]
  );

  const rejectActivity = useCallback(
    async (_pin, _password, wallet, key) => {
      setSecretKeyModal(initialSecretKeyModal);
      setLoadingModalVisible({
        state: true,
        title: texts?.modalPublishLoading?.rejected || 'The activity is being rejected'
      });
      const result = await updateActivityStatus(activityId, 'rejected', `${uuid()}-mocked`);
      if (result.errors) {
        message.error('An error occurred while rejecting the activity');
        setLoadingModalVisible({ ...loadingModalVisible, state: false });
        return;
      }

      const messageToSign = JSON.stringify(result?.data?.toSign);
      try {
        const authorizationSignature = await signMessage(wallet, messageToSign, key);
        const response = await signActivity({ authorizationSignature, activityId });
        if (response.errors) {
          throw new Error(response.errors);
        }
        setLoadingModalVisible({ ...loadingModalVisible, state: false });
        getEvidences(activityId);
        getChangelog();
      } catch (error) {
        message.error('An error occurred while rejecting the activity');
        history.push(`/${projectId}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getChangelog, activityId, getEvidences, loadingModalVisible]
  );

  const approveActivity = useCallback(
    async (_pin, _password, wallet, key) => {
      setSecretKeyModal(initialSecretKeyModal);
      setLoadingModalVisible({
        state: true,
        title: texts?.modalPublishLoading?.approved || 'The activity is being approved'
      });
      const result = await updateActivityStatus(activityId, 'approved', `${uuid()}-mocked`);
      if (result.errors) {
        message.error('An error occurred while approving the activity');
        setLoadingModalVisible({ ...loadingModalVisible, state: false });
        return;
      }

      const messageToSign = JSON.stringify(result?.data?.toSign);
      try {
        const authorizationSignature = await signMessage(wallet, messageToSign, key);
        const response = await signActivity({ authorizationSignature, activityId });
        if (response.errors) {
          throw new Error(response.errors);
        }
        setLoadingModalVisible({ ...loadingModalVisible, state: false });
        getEvidences(activityId);
        getChangelog();
      } catch (error) {
        message.error('An error occurred while approving the activity');
        history.push(`/${projectId}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activityId, getChangelog, getEvidences, loadingModalVisible]
  );

  const areReviewedEvidences =
    evidences.length > 0 &&
    evidences.every(({ status }) => ['approved', 'rejected'].includes(status));

  const enableAddEvidenceBtn = canAddEvidences(user, projectId);

  const auditorName = getAuditorName(activity?.auditor, project);

  const { budget, spent, deposited } = activity || {};
  const currency = project?.details?.currency;
  const remaining = parseFloat(budget) - parseFloat(spent);
  const transferQuantity = evidences?.reduce(
    (curr, next) => (next?.type === 'transfer' ? curr + 1 : curr),
    0
  );
  const impactQuantity = evidences?.reduce(
    (curr, next) => (next?.type === 'impact' ? curr + 1 : curr),
    0
  );

  const isProjectEditing = project?.editing;

  const handleAddEvidence = useCallback(
    e => {
      e.stopPropagation();
      history.push(`/${projectId}/activity/${activityId}/create-evidence`);
    },
    [activityId, history, projectId]
  );

  const handleSendForReview = useCallback(() => {
    setSecretKeyModal({
      visible: true,
      title: 'You are about to send an activity to be reviewed by an auditor',
      onSuccessAction: sendToReview,
      leaveAComment: false
    });
  }, [sendToReview]);

  const handleRejectActivity = useCallback(() => {
    setSecretKeyModal({
      visible: true,
      title: 'Are you sure you want to reject the activity?',
      onSuccessAction: rejectActivity,
      leaveAComment: true
    });
  }, [rejectActivity]);

  const handleApproveActivity = useCallback(() => {
    setSecretKeyModal({
      visible: true,
      title: 'Are you sure you want to approve the activity?',
      onSuccessAction: approveActivity,
      leaveAComment: false
    });
  }, [approveActivity]);

  const handleCancelConfirmSk = useCallback(() => {
    setSecretKeyModal(initialSecretKeyModal);
  }, []);

  const handleCancelReviewSuccess = useCallback(() => {
    setReviewSuccessVisible(false);
  }, []);

  const signActivityInStepOne = async (_pin, _password, wallet, key) => {
    const _toSign = activity?.toSign;
    if (!_toSign) {
      message.error('An error occurred while signing the activity');
      return;
    }

    setShowModalToSignMessage(false);
    setLoadingModalVisible({
      state: true,
      title: texts?.modalPublishLoading?.sent || 'The activity is being signed'
    });
    const messageToSign = JSON.stringify(_toSign);

    try {
      const authorizationSignature = await signMessage(wallet, messageToSign, key);
      const response = await signActivity({ authorizationSignature, activityId });

      if (response.errors) {
        throw new Error(response.errors);
      }

      setLoadingModalVisible({ ...loadingModalVisible, state: false });
      // setReviewSuccessVisible(true);
      getEvidences(activityId);
      getChangelog();
    } catch (error) {
      message.error('An error occurred while signing the activity');
      history.push(`/${projectId}`);
    }
  };

  return (
    <>
      <div className="evidences">
        <Loading spinning={areEvidencesLoading}>
          <div className="evidences__list">
            <div className="evidences__list__header">
              <div>
                <p className="evidences__list__header__title">{activity.title}</p>
                <p className="evidences__list__header__subtitle">Auditor: {auditorName}</p>
              </div>
              <div className="evidences__list__header__right">
                {enableAddEvidenceBtn && (
                  <AddEvidenceButton
                    onClickAddEvidence={handleAddEvidence}
                    responsiveLayout={false}
                    disabled={
                      activityStatus === ACTIVITY_STATUS_ENUM.TO_REVIEW ||
                      activityStatus === ACTIVITY_STATUS_ENUM.APPROVED ||
                      isProjectEditing
                    }
                  />
                )}
                <CoaTag predefinedColor={activityStatusMap?.[activityStatus]?.color}>
                  {activityStatusMap?.[activityStatus]?.name}
                </CoaTag>
              </div>
            </div>
            <Divider type="horizontal" />

            <div className="evidences__list__body">
              <CoaIndicators
                {...{
                  currency,
                  budget,
                  spent,
                  deposited,
                  remaining,
                  transferQuantity,
                  impactQuantity
                }}
                withEvidences
              />

              <div className="evidences__list__body__info">
                <div>
                  <p className="evidences__indicatorTitle">
                    {texts?.general?.description || 'Description'}
                  </p>
                  <p className="evidences__indicatorValue">{activity?.description}</p>
                </div>
                <div>
                  <p className="evidences__indicatorTitle">
                    {texts?.general?.acceptanceCriteria || 'Acceptance Criteria'}
                  </p>
                  <p className="evidences__indicatorValue">{activity?.acceptanceCriteria}</p>
                </div>
              </div>

              {evidences?.length > 0 && <Divider type="horizontal" />}

              {!areEvidencesLoading && (
                <div
                  className={classNames('evidences__list__body__evidencesContainer', {
                    '--empty': evidences.length === 0
                  })}
                >
                  {sortArrayByDate(evidences, 'createdAt').map((evidence, index) => (
                    <EvidenceCard
                      key={evidence.id}
                      evidenceNumber={evidences.length - index}
                      evidence={evidence}
                      currency={project?.details?.currency}
                      isActivityAuditor={isActivityAuditor}
                      preview={preview}
                    />
                  ))}
                  {evidences?.length === 0 && (
                    <>
                      <img src="/static/images/file-icon.png" alt="empty-evidences-list" />
                      <p className="evidences__list__body__evidencesContainer__emptyText">
                        {texts?.evidences?.emptyEvidences || 'There are no evidences uploaded yet'}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {(isBeneficiaryOrInvestor ||
              (isActivityAuditor && activityStatus === ACTIVITY_STATUS_ENUM.TO_REVIEW)) && (
              <Divider type="horizontal" />
            )}

            <div className="evidences__list__footer">
              {isBeneficiaryOrInvestor && (
                <>
                  <CoaButton
                    type="primary"
                    disabled={
                      evidences?.length === 0 ||
                      activityStatus === ACTIVITY_STATUS_ENUM.TO_REVIEW ||
                      activityStatus === ACTIVITY_STATUS_ENUM.APPROVED ||
                      activityStatus === ACTIVITY_STATUS_ENUM.REJECTED ||
                      isProjectEditing
                    }
                    onClick={handleSendForReview}
                  >
                    {texts?.evidences?.btnSendReview || 'Send for review'}
                  </CoaButton>
                </>
              )}
              {isActivityAuditor && activityStatus === ACTIVITY_STATUS_ENUM.TO_REVIEW && (
                <>
                  <CoaRejectButton
                    disabled={!areReviewedEvidences || isProjectEditing || activityStep === 1}
                    onClick={handleRejectActivity}
                  >
                    Reject
                  </CoaRejectButton>
                  <CoaApproveButton
                    disabled={!areReviewedEvidences || isProjectEditing || activityStep === 1}
                    onClick={handleApproveActivity}
                  >
                    Approve
                  </CoaApproveButton>
                </>
              )}
            </div>
          </div>
        </Loading>
      </div>
      {user && (
        <>
          <ModalConfirmWithSK
            visible={showModalToSignMessage}
            title="You are about to sign the activity to finish the process"
            description="To confirm the process enter your password and secret key"
            okText="Sign"
            onSuccess={signActivityInStepOne}
            cancelText="Go Back"
            onCancel={() => history.push(`/${projectId}`)}
          />
          <ModalConfirmWithSK
            visible={secretKeyModal.visible}
            title={secretKeyModal.title}
            onCancel={handleCancelConfirmSk}
            onSuccess={secretKeyModal.onSuccessAction}
            leaveAComment={secretKeyModal.leaveAComment}
          />
          <ModalPublishLoading
            visible={loadingModalVisible.state}
            textTitle={loadingModalVisible.title}
          />
          <ModalEvidencesReviewSuccess
            visible={reviewSuccessVisible}
            onCancel={handleCancelReviewSuccess}
          />
        </>
      )}
    </>
  );
};

Evidences.defaultProps = {
  project: undefined,
  activity: undefined,
  evidences: undefined,
  areEvidencesLoading: undefined,
  getEvidences: undefined,
  getChangelog: undefined
};

Evidences.propTypes = {
  project: PropTypes.objectOf(PropTypes.any),
  activity: PropTypes.objectOf(PropTypes.any),
  evidences: PropTypes.objectOf(PropTypes.any),
  areEvidencesLoading: PropTypes.bool,
  getEvidences: PropTypes.func,
  getChangelog: PropTypes.func
};

export default Evidences;
