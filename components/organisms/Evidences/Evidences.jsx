import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { message } from 'antd';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { UserContext } from 'components/utils/UserContext';
import activityStatusMap, { ACTIVITY_STATUS_ENUM } from 'model/activityStatus';
import EvidenceNavigation from '../../atoms/EvidenceNavigation/EvidenceNavigation';
import EvidenceCard from '../../atoms/EvidenceCard/EvidenceCard';
import EvidenceFormFooter from '../../atoms/EvidenceFormFooter/EvidenceFormFooter';
import { getActivityEvidences, updateActivityStatus } from '../../../api/activityApi';
import Loading from '../../molecules/Loading/Loading';
import ModalConfirmWithSK from '../ModalConfirmWithSK/ModalConfirmWithSK';
import ModalPublishLoading from '../ModalPublishLoading/ModalPublishLoading';
import ModalEvidencesReviewSuccess from '../ModalEvidencesReviewSuccess/ModalEvidencesReviewSuccess';

const Evidences = ({ project }) => {
  const activityId = window.location.pathname.split('/')[3];

  const [evidences, setEvidences] = useState([]);
  const [milestone, setMilestone] = useState({});
  const [activity, setActivity] = useState({});
  const [secretKeyModalVisible, setSecretKeyModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [reviewSuccessVisible, setReviewSuccessVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const isAuditor = user?.id === activity.auditor;
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

  const goToNextModal = (current, next) => {
    current(false);
    next(true);
  };

  const sendToReview = async () => {
    goToNextModal(setSecretKeyModalVisible, setLoadingModalVisible);
    const result = await updateActivityStatus(activityId, 'to-review');
    if (!result.errors) {
      goToNextModal(setLoadingModalVisible, setReviewSuccessVisible);
    } else {
      setLoadingModalVisible(false);
    }
  };

  return (
    <>
      <div className="container">
        <EvidenceNavigation />
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
                {!!user && (
                  <button type="button">
                    <span>
                      <img src="/static/images/plus-icon.svg" alt="" />
                    </span>
                    <span>Add evidences</span>
                  </button>
                )}
                <CoaTag predefinedColor={activityStatusMap?.[activityStatus]?.color}>
                  {activityStatusMap?.[activityStatus]?.name}
                </CoaTag>
              </div>
            </div>
            <div className="evidenceCards">
              {evidences.map(evidence => (
                <EvidenceCard
                  key={evidence.id}
                  evidence={evidence}
                  currency={project?.details?.currency}
                />
              ))}
            </div>
            {isAuditor && (
              <div className="reviewBtn">
                <div className="reviewBtnDesktop">
                  <button
                    className={`btn revDeskBtn ${
                      activityStatus === ACTIVITY_STATUS_ENUM.IN_PROGRESS ? 'active' : 'inactive'
                    }`}
                    disabled={activityStatus === ACTIVITY_STATUS_ENUM.TO_REVIEW}
                    onClick={() => setSecretKeyModalVisible(true)}
                    type="button"
                  >
                    Send for review
                  </button>
                </div>
                <div className="reviewBtnMobile">
                  <button
                    type="button"
                    className={`btn revMobBtn ${
                      activityStatus === ACTIVITY_STATUS_ENUM.IN_PROGRESS ? 'active' : 'inactive'
                    }`}
                    disabled={activityStatus === ACTIVITY_STATUS_ENUM.TO_REVIEW}
                    onClick={() => setSecretKeyModalVisible(true)}
                  >
                    Send activity to review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {user && (
        <>
          <ModalConfirmWithSK
            visible={secretKeyModalVisible}
            title="You are about to send an activity to be reviewed by an auditor"
            onCancel={() => setSecretKeyModalVisible(false)}
            onSuccess={sendToReview}
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
