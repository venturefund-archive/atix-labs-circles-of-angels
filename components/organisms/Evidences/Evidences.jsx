import React, { useState } from 'react';
import './_style.scss';
import EvidenceNavigation from '../../atoms/EvidenceNavigation/EvidenceNavigation';
// eslint-disable-next-line import/named
import { evidences } from './evidences';
import EvidenceCard from '../../atoms/EvidenceCard/EvidenceCard';
import EvidenceFormFooter from '../../atoms/EvidenceFormFooter/EvidenceFormFooter';
import EvidenceModal, { EvidenceModalReviewInfo, EvidenceModalSentSuccess } from '../../atoms/EvidenceModal/EvidenceModal';

const Evidences = () => {
    const progress = 'in progress';
    const [reviewModal, setReviewModal] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const openModal = () => setReviewModal(true);
    const closeModal = () => {
        setReviewModal(false);
        setSentSuccess(false);
    };

    const setReviewToSent = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSentSuccess(true);
        }, 2000);
    };

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
                            loading={loading}
                            setReviewToSent={setReviewToSent}
                      />
                    )}
            </EvidenceModal>
            )}
          <div className="evidences">
            <div className="evidencesHeader">
              <span className="evidencesHeaderDesktop">
                        Milestone 2 / Activity 1 / Evidences
              </span>
              <span className="evidencesHeaderMobile">Evidences</span>
            </div>
            <div className="evidencesCardInfoMobile">
              <p>ACTIVITY N°2</p>
              <p>Negotiate and finalize purchase orders</p>
            </div>
            <div className="evidencesCard">
              <div className="cardInfo">
                <p>
                  <span>Activity2 - </span>
                  <span>Negotiate and finalize purchase orders</span>
                </p>
                <div className="evidenceStatus">
                  <button type='button'>
                    <span>
                      <img src="/static/images/plus-icon.svg" alt=""/>
                    </span>
                    <span>Add evidences</span>
                  </button>
                  <p
                      className={`progressStatus ${
                          progress === 'in progress' ? 'inProgress' : 'inReview'
                      }`}
                  >
                    {progress}
                  </p>
                </div>
              </div>
              <div className="evidenceCards">
                {evidences?.map((evidence) => (
                  <EvidenceCard evidence={evidence} />
                        ))}
              </div>
              <div className="reviewBtn">
                <div className="reviewBtnDesktop">
                  <button
                      className={`btn revDeskBtn ${
                          progress === 'in progress' ? 'active' : 'inactive'
                      }`}
                      disabled={progress === 'in review'}
                      onClick={openModal}
                      type='button'
                  >
                      Send for review
                  </button>
                </div>
                <div className="reviewBtnMobile">
                  <button
                      type='button'
                      className={`btn revMobBtn ${
                                    progress === 'in progress' ? 'active' : 'inactive'
                      }`}
                      disabled={progress === 'in review'}
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