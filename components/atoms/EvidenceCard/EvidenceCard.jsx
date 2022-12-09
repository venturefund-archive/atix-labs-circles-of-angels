import React from 'react';
import './evidenceCard.scss';
import PropTypes from 'prop-types';
import { addElipsesToText } from '../../utils';
import EvidenceButton from '../EvidenceButton/EvidenceButton';
import { getDateAndTime } from '../../../helpers/utils';
import { useHistory } from 'react-router';

const EvidenceCard = ({ evidence }) => {
    const { title, status, createdAt, description, reason, income, outcome, id } = evidence;

    const { push } = useHistory()
    return (
      <div className="evidenceCard">
        <div className="statusDay">
          <p className="date">
            {getDateAndTime(createdAt)}
          </p>
          <p className={`status ${status}`}>
            {status}
          </p>
        </div>
        <p className="title">{title}</p>
        <p className="subtitle">{reason}</p>
        <div className="description">
          {addElipsesToText(description, 150)}
        </div>
        <div className="amountSpentDiv">
          {(income || outcome) && (
            <div className="amountSpent">
              <p>
                <img src="/static/images/dollar-icon.svg" alt="icon"/>
                <span>amount spent</span>
              </p>
              <p>{income || outcome} USD</p>
            </div>
                )}
        </div>
        <EvidenceButton
              text='View more details'
              variant="primary"
              onClick={() => push(`evidences/${id}`)}
              type="button"
        />
      </div>
    );
};
export default EvidenceCard;

EvidenceCard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
    evidence: PropTypes.object,
};
