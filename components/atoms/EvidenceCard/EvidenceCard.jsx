import React from 'react';
import './evidenceCard.scss';
import PropTypes from 'prop-types';
import { addElipsesToText } from '../../utils';
import EvidenceButton from '../EvidenceButton/EvidenceButton';

const EvidenceCard = ({ evidence }) => {
    const {
        day,
        time,
        amountSpent,
        evidenceDetails,
        evidenceTitle,
        evidenceSubtitle,
        status,
    } = evidence;

    return (
      <div className="evidenceCard">
        <div className="statusDay">
          <p className="date">
            {day} - {time}
          </p>
          <p
                    className={`status ${status}`}
          >
            {status}
          </p>
        </div>
        <p className="title">{evidenceTitle}</p>
        <p className="subtitle">{evidenceSubtitle}</p>
        <div className="description">
          {addElipsesToText(evidenceDetails, 150)}
        </div>
        <div className="amountSpentDiv">
          {amountSpent && (
            <div className="amountSpent">
              <p>
                <img width={50} height={50} src="static/images/dollar-icon.svg" alt="icon"/>
                <span>amount spent</span>
              </p>
              <p>{amountSpent} USD</p>
            </div>
                )}
        </div>
        <EvidenceButton
              text="View more details"
              variant="primary"
              onClick={() => console.log('click')}
              type="button"
        />
      </div>
    );
};
export default EvidenceCard;

EvidenceCard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    evidence: PropTypes.object,
};
