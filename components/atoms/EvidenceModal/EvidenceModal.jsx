/* eslint-disable jsx-a11y/click-events-have-key-events,
                            jsx-a11y/no-static-element-interactions,
                             jsx-a11y/label-has-for */
import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import EvidenceButton from '../EvidenceButton/EvidenceButton';
import './_style.scss';

const EvidenceModal = ({ children, closeModal }) => (
  <div className="modalContainer" onClick={closeModal}>
    {children}
  </div>
);
export default EvidenceModal;

const EvidenceModalInfo = ({ modalTitle, modalSubtitle, titleWidth, subtitleWidth, icon }) => (
  <div className="modalSharedInfo">
    <div>
      <img src={icon} alt="icon" />
    </div>
    <p className="modalTitle" style={{ maxWidth: titleWidth }}>
      {modalTitle}
    </p>
    <p className="modalSubtitle" style={{ maxWidth: subtitleWidth }}>
      {modalSubtitle}
    </p>
  </div>
);

export const EvidenceModalReviewInfo = ({ closeModal, loading, setReviewToSent }) => (
  <div className="modalInfoContainer" onClick={e => e.stopPropagation()}>
    <EvidenceModalInfo
      icon="/static/images/coa-modal-icon.svg"
      modalTitle="You are about to send an activity to be reviewed by an auditor"
      modalSubtitle="To confirm the process please enter your administrator password and secret key"
      titleWidth="300px"
      subtitleWidth="250px"
    />
    <div className="form">
      <Form layout="vertical">
        <div>
          <Form.Item
            label={
              <label htmlFor="password" style={{ color: '#728099' }}>
                Password
              </label>
            }
          >
            <Input.Password id="password" placeholder="Enter your new password" />
          </Form.Item>
        </div>
        <div>
          {/* eslint-disable-next-line */}
          <Form.Item
            label={
              <label htmlFor="secret" style={{ color: '#728099' }}>
                Secret Key
              </label>
            }
          >
            <Input.Password id="secret" placeholder="Repeat your secret key" />
          </Form.Item>
        </div>
        <div className="modalInfoBtn">
          <EvidenceButton text="Cancel" width variant="default" onClick={closeModal} />
          <EvidenceButton
            text={loading ? 'Sending...' : 'Confirm'}
            width
            variant="primary"
            onClick={setReviewToSent}
          />
        </div>
      </Form>
    </div>
  </div>
);

export const EvidenceModalSentSuccess = ({ closeModal }) => (
  <div className="modalInfoContainer" onClick={e => e.stopPropagation()}>
    <EvidenceModalInfo
      icon="/static/images/review-success.svg"
      modalTitle="The activity was sent successfully!"
      modalSubtitle="The evidences of the activity will be reviewed by an auditor."
      titleWidth="220px"
      subtitleWidth="240px"
    />
    <div className="modalInfoBtn">
      <EvidenceButton text="Continue" width variant="primary" onClick={closeModal} type="button" />
    </div>
  </div>
);

EvidenceModalSentSuccess.propTypes = {
  closeModal: PropTypes.func.isRequired
};

EvidenceModal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

EvidenceModalInfo.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  modalSubtitle: PropTypes.string.isRequired,
  titleWidth: PropTypes.number.isRequired,
  subtitleWidth: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired
};

EvidenceModalReviewInfo.propTypes = {
  closeModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setReviewToSent: PropTypes.func.isRequired
};
