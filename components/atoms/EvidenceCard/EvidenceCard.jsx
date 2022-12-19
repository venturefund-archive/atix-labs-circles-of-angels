import React from 'react';
import './evidenceCard.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { EVIDENCE_STATUS_MAP, EVIDENCE_TYPES_ENUM } from 'model/evidence';
import { formatCurrency } from 'helpers/formatter';
import { addElipsesToText } from '../../utils';
import EvidenceButton from '../EvidenceButton/EvidenceButton';
import { getDateAndTime } from '../../../helpers/utils';
import { CoaTag } from '../CoaTag/CoaTag';

const EvidenceCard = ({ evidence, currency, evidenceNumber }) => {
  const { title, status, createdAt, description, reason, income, outcome, id, type } = evidence;
  const amount = parseFloat(income) || parseFloat(outcome);

  const { push } = useHistory();
  return (
    <div className="evidenceCard">
      <div className="statusDay">
        <p className="date">{getDateAndTime(createdAt)}</p>
        <CoaTag predefinedColor={EVIDENCE_STATUS_MAP[status]?.color}>
          {EVIDENCE_STATUS_MAP[status]?.name}
        </CoaTag>
      </div>
      <p className="evidenceNumber">Evidence N°{evidenceNumber}</p>
      <p className="title">{title}</p>
      <p className="subtitle">{reason}</p>
      <div className="description">{addElipsesToText(description, 150)}</div>
      {type === EVIDENCE_TYPES_ENUM.TRANSFER && (
        <div className="amountSpentDiv">
          {
            <div className="amountSpent">
              <p>
                <img src="/static/images/dollar-icon.svg" alt="icon" />
                <span>amount spent</span>
              </p>
              <p>{formatCurrency(currency, amount)}</p>
            </div>
          }
        </div>
      )}
      <EvidenceButton
        text="View more details"
        variant="primary"
        onClick={() => push(`evidences/${id}`)}
        type="button"
      />
    </div>
  );
};
export default EvidenceCard;

EvidenceCard.defaultProps = {
  evidence: undefined,
  currency: undefined
};

EvidenceCard.propTypes = {
  evidence: PropTypes.objectOf(PropTypes.any),
  currency: PropTypes.string
};
