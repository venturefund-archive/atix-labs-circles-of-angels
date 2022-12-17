import React, { useState, useEffect, useContext } from 'react';
import './_style.scss';
import { message } from 'antd';
import { UserContext } from 'components/utils/UserContext';
import { useHistory, useParams } from 'react-router-dom';
import EvidenceNavigation from '../../atoms/EvidenceNavigation/EvidenceNavigation';
import EvidenceCard from '../../atoms/EvidenceCard/EvidenceCard';
import EvidenceFormFooter from '../../atoms/EvidenceFormFooter/EvidenceFormFooter';
import { getActivityEvidences, updateActivityStatus } from '../../../api/activityApi';
import Loading from '../../molecules/Loading/Loading';
import ModalConfirmWithSK from '../ModalConfirmWithSK/ModalConfirmWithSK';
import ModalPublishLoading from '../ModalPublishLoading/ModalPublishLoading';
import ModalEvidencesReviewSuccess from '../ModalEvidencesReviewSuccess/ModalEvidencesReviewSuccess';
import { canAddEvidences } from '../../../helpers/canAddEvidence';
import { AddEvidenceButton } from '../../atoms/AddEvidenceButton/AddEvidenceButton';

const Evidences = () => {
  const activityId = window.location.pathname.split('/')[3]
  const progress = 'in progress';

  const history = useHistory();
  const { id: projectId } = useParams();

  const [evidences, setEvidences] = useState([]);
  const [milestone, setMilestone] = useState({});
  const [activity, setActivity] = useState({});
  const [secretKeyModalVisible, setSecretKeyModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [reviewSuccessVisible, setReviewSuccessVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const isAuditor = user?.id === activity.auditor;

  useEffect(() => {
    const getEvidences = async (_activity) => {
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
    }

    getEvidences(activityId);

    // eslint-disable-next-line
  }, [])

  if (loading) return <Loading></Loading>;

  const goToNextModal = (current, next) => {
    current(false);
    next(true);
  }

  const sendToReview = async () => {
    goToNextModal(setSecretKeyModalVisible, setLoadingModalVisible);
    const result = await updateActivityStatus(activityId, 'to-review')
    if (!result.errors) {
      goToNextModal(setLoadingModalVisible, setReviewSuccessVisible);
    } else {
      setLoadingModalVisible(false)
    }
  }

  const enableAddEvidenceBtn = canAddEvidences(user, projectId);

  return (
    <>
      <div className='container'>
        <EvidenceNavigation />
        <div className="evidences">
          <div className="evidencesHeader">
            <span className="evidencesHeaderDesktop">
              {milestone.title} / {activity.title} / Evidences
            </span>
            <span className="evidencesHeaderMobile">Evidences</span>
          </div>
          <div className="evidencesCardInfoMobile">
            <p>ACTIVITY N°2</p>
            <p>{activity.title}</p>
          </div>
          <div className="evidencesCard">
            <div className="cardInfo">
              <p>
                <span>Activity2 - </span>
                <span>{activity.title}</span>
              </p>
              <div className="evidenceStatus">
                {
                  enableAddEvidenceBtn &&
                  <AddEvidenceButton
                    onClickAddEvidence={() => {
                      history.push(`/${projectId}/activity/${activity?.id}/create-evidence`);
                    }}
                    responsiveLayout={false}
                  />
                }
                <p
                  className={`progressStatus ${progress === 'in progress' ? 'inProgress' : 'inReview'
                    }`}
                >
                  {progress}
                </p>
              </div>
            </div>
            <div className="evidenceCards">
              {
                evidences.map((evidence) => (
                  <EvidenceCard key={evidence.id} evidence={evidence} />
                ))
              }
            </div>
            {
              isAuditor && (
                <div className="reviewBtn">
                  <div className="reviewBtnDesktop">
                    <button
                      className={`btn revDeskBtn ${progress === 'in progress' ? 'active' : 'inactive'
                        }`}
                      disabled={progress === 'in review'}
                      onClick={() => setSecretKeyModalVisible(true)}
                      type='button'
                    >
                      Send for review
                    </button>
                  </div>
                  <div className="reviewBtnMobile">
                    <button
                      type='button'
                      className={`btn revMobBtn ${progress === 'in progress' ? 'active' : 'inactive'
                        }`}
                      disabled={progress === 'in review'}
                      onClick={() => setSecretKeyModalVisible(true)}
                    >
                      Send activity to review
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      {user && <>
        <ModalConfirmWithSK
          visible={secretKeyModalVisible}
          title='You are about to send an activity to be reviewed by an auditor'
          onCancel={() => setSecretKeyModalVisible(false)}
          onSuccess={sendToReview}
        />
        <ModalPublishLoading visible={loadingModalVisible} />
        <ModalEvidencesReviewSuccess
          visible={reviewSuccessVisible}
          onCancel={() => setReviewSuccessVisible(false)}
        />
      </>
      }
      <EvidenceFormFooter />
    </>
  );
}

export default Evidences;
