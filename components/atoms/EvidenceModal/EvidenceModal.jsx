import React, { useState } from 'react';
import EvidenceButton from '../EvidenceButton/EvidenceButton';
import './_style.scss';

const EvidenceModal = ({ children, closeModal }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div className="modalContainer" onClick={closeModal}>
    {children}
  </div>
);
export default EvidenceModal;

const EvidenceModalInfo = ({
  modalTitle,
  modalSubtitle,
  titleWidth,
  subtitleWidth,
  icon,
  }) => (
    <div className="modalSharedInfo">
      <div>
        <img src={icon} alt="icon"/>
      </div>
      <p className="modalTitle" style={{ maxWidth: titleWidth }}>
        {modalTitle}
      </p>
      <p className="modalSubtitle" style={{ maxWidth: subtitleWidth }}>
        {modalSubtitle}
      </p>
    </div>
);

export const EvidenceModalReviewInfo = ({ closeModal, loading, setReviewToSent }) => {
    const [togglePassword, setTogglePassword] = useState(false);
    const [toggleSecretKey, setToggleSecretKey] = useState(false);

    return (
      <div className="modalInfoContainer" onClick={(e) => e.stopPropagation()}>
        <EvidenceModalInfo
                icon="static/images/coa-modal-icon.svg"
                modalTitle="You are about to send an activity to be reviewed by an auditor"
                modalSubtitle="
      To confirm the process please enter your administrator password and secret key"
                titleWidth="300px"
                subtitleWidth="250px"
        />
        <div className="form">
          <div>
            <label htmlFor="password">Password</label>
            <input
                        type={togglePassword ? 'text' : 'password'}
                        placeholder="Enter your new password"
            />
            <span onClick={() => setTogglePassword(!togglePassword)}>
              {togglePassword ? 'hi' : 'sh'}
            </span>
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-for */}
            <label htmlFor="secret_key">Secret Key</label>
            <input
                        type={toggleSecretKey ? 'text' : 'password'}
                        placeholder="Repeat your secret key"
            />
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <span onClick={() => setToggleSecretKey(!toggleSecretKey)}>
              {toggleSecretKey ? 'hi' : 'sh'}
            </span>
          </div>
        </div>

        <div className="modalInfoBtn">
          <EvidenceButton type="button" text="Cancel" width variant="default" onClick={closeModal}/>
          <EvidenceButton
                    text={loading ? 'Sending...' : 'Confirm'}
                    width
                    variant="primary"
                    onClick={setReviewToSent}
                    type="button"
          />
        </div>
      </div>
    );
};

export const EvidenceModalSentSuccess = ({ closeModal }) => (
  <div className="modalInfoContainer" onClick={(e) => e.stopPropagation()}>
    <EvidenceModalInfo
            icon="static/images/review-success.svg"
            modalTitle="The activity was sent successfully!"
            modalSubtitle="
        The evidences of the activity will be reviewed by an auditor."
            titleWidth="220px"
            subtitleWidth="240px"
    />
    <div className="modalInfoBtn">
      <EvidenceButton
                text="Continue"
                width
                variant="primary"
                onClick={closeModal}
                type="button"
      />
    </div>
  </div>
);
