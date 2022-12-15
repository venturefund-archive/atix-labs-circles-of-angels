import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './_style.scss';
import { message } from 'antd';
import { useHistory } from 'react-router';
import EvidenceNavigation from '../../atoms/EvidenceNavigation/EvidenceNavigation';
import EvidenceCard from '../../atoms/EvidenceCard/EvidenceCard';
import EvidenceFormFooter from '../../atoms/EvidenceFormFooter/EvidenceFormFooter';
import EvidenceModal, { EvidenceModalReviewInfo, EvidenceModalSentSuccess } from '../../atoms/EvidenceModal/EvidenceModal';
import { getActivityEvidences } from '../../../api/activityApi';
import Loading from '../../molecules/Loading/Loading';
import { getActivity } from '../../utils';

const Evidences = ({ project }) => {
    const history = useHistory();
    const activityId = window.location.pathname.split('/')[3]

    const { activity: foundActivity, milestone: foundMilestone } = getActivity(project, activityId)
    if (!foundActivity) {
        history.push('/');
    }

    const [evidences, setEvidences] = useState([]);
    const [reviewModal, setReviewModal] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activity] = useState(foundActivity);
    const [isAvailableForReview, setIsAvailableForReview] = useState(false);


    const openModal = () => setReviewModal(true);
    const closeModal = () => {
        setReviewModal(false);
        setSentSuccess(false);
    };

    const setReviewToSent = () => {
        setButtonLoading(true);
        setTimeout(() => {
            setButtonLoading(false);
            setSentSuccess(true);
        }, 2000);
    };

    useEffect(() => {
        const getEvidences = async (id) => {
            setLoading(true);
            const response = await getActivityEvidences(id);
            if (response.errors || !response.data) {
                message.error('An error occurred while fetching the project');
                history.push('/');
                return;
            }

            setEvidences(response.data.evidences);
            setLoading(false);
            setIsAvailableForReview(response.data.evidences.some((evidence) => evidence.status === 'new'))
        }

        getEvidences(activityId);

        // eslint-disable-next-line
    }, []);

    if (loading || !activity) return <Loading></Loading>;

    return (
      <>
        <div className='container'>
          <EvidenceNavigation/>
          {reviewModal && (
            <EvidenceModal closeModal={closeModal}>
              {sentSuccess ? (
                <EvidenceModalSentSuccess closeModal={closeModal} />
                    ) : (
                      <EvidenceModalReviewInfo
                            closeModal={closeModal}
                            loading={buttonLoading}
                            setReviewToSent={setReviewToSent}
                      />
                    )}
            </EvidenceModal>
            )}
          <div className="evidences">
            <div className="evidencesHeader">
              <span className="evidencesHeaderDesktop">
                        Milestone {foundMilestone.id} / Activity {foundActivity.id} / Evidences
              </span>
              <span className="evidencesHeaderMobile">Evidences</span>
            </div>
            <div className="evidencesCardInfoMobile">
              <p>ACTIVITY N°{activity.id}</p>
              <p>{activity.title}</p>
            </div>
            <div className="evidencesCard">
              <div className="cardInfo">
                <p>
                  <span>Activity - </span>
                  <span>{activity.title}</span>
                </p>
                <div className="evidenceStatus">
                  {activity.status !== ('approved' || 'to-review') && (
                    <button type='button'>
                      <span>
                        <img src="/static/images/plus-icon.svg" alt=""/>
                      </span>
                      <span>Add evidences</span>
                    </button>)}
                  <p
                      className={`progressStatus ${activity.status}`}
                  >
                    {activity.status}
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
              <div className="reviewBtn">
                <div className="reviewBtnDesktop">
                  <button
                      className={`btn revDeskBtn ${ isAvailableForReview ? 'active' : 'inactive' }`}
                      disabled={isAvailableForReview}
                      onClick={openModal}
                      type='button'
                  >
                      Send for review
                  </button>
                </div>
                <div className="reviewBtnMobile">
                  <button
                      type='button'
                      className={`btn revMobBtn ${ isAvailableForReview ? 'active' : 'inactive' }`}
                      disabled={isAvailableForReview}
                      onClick={openModal}
                  >
                      Send activity to review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EvidenceFormFooter/>
      </>
    );
}

export default Evidences;

Evidences.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    project: PropTypes.object.isRequired,
}