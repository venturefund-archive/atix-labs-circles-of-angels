import React from 'react';
import { Icon } from 'antd';
import './evidenceCard.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { EVIDENCE_STATUS_MAP, EVIDENCE_TYPES_ENUM, EVIDENCE_STATUS_ENUM } from 'model/evidence';
import { formatCurrency } from 'helpers/formatter';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import EvidenceButton from '../EvidenceButton/EvidenceButton';
import { getDateAndTime } from '../../../helpers/utils';
import { CoaTag } from '../CoaTag/CoaTag';

const EvidenceCard = ({ evidence, currency, evidenceNumber, isActivityAuditor }) => {
  const { texts } = React.useContext(DictionaryContext);
  const { title, status, createdAt, description, income, outcome, id, type } = evidence;
  const amount = parseFloat(income) || parseFloat(outcome);

  const isAuditEvidenceAvailable = isActivityAuditor && status === EVIDENCE_STATUS_ENUM.NEW;

  const { push } = useHistory();
  return (
    <div className="evidenceCard">
      <div className="evidenceCard__header">
        <p className="evidenceCard__date">{getDateAndTime(createdAt)}</p>
        <CoaTag predefinedColor={EVIDENCE_STATUS_MAP[status]?.color}>
          {EVIDENCE_STATUS_MAP[status]?.name}
        </CoaTag>
      </div>
      <div className="evidenceCard__body">
        <p className="evidenceCard__orderNumber">Evidence N°{evidenceNumber}</p>
        <p className="evidenceCard__title">{title}</p>
        <div className="evidenceCard__description">{description}</div>
        <div className="evidenceCard__indicatorContainer">
          <p className="evidenceCard__indicatorContainer__indicator">
            <Icon
              type="file-text"
              theme="filled"
              style={{ fontSize: '1.1rem', color: '#4C7FF7' }}
            />
            <span className="evidenceCard__indicatorContainer__indicator__text">
              {texts?.evidenceDetail?.evidenceType || 'Evidence Type'}
            </span>
          </p>
          <p className="evidenceCard__indicatorContainer__value">{type}</p>
        </div>
        {type === EVIDENCE_TYPES_ENUM.TRANSFER && (
          <div className="evidenceCard__indicatorContainer">
            <p className="evidenceCard__indicatorContainer__indicator">
              <Icon
                type="dollar-circle"
                theme="filled"
                style={{ fontSize: '1.1rem', color: '#4C7FF7' }}
              />
              <span className="evidenceCard__indicatorContainer__indicator__text">
                {parseFloat(income)
                  ? texts?.general?.income || 'Income'
                  : texts?.general?.outcome || 'Outcome'}
              </span>
            </p>
            <p className="evidenceCard__indicatorContainer__value">
              {formatCurrency(currency, amount, true)}
            </p>
          </div>
        )}
      </div>
      <div className="evidenceCard__footer">
        <EvidenceButton
          text={ isAuditEvidenceAvailable
            ? texts?.evidenceCard?.audit || 'Audit evidence'
            : texts?.evidenceCard?.viewMore || 'View more details'
          }
          variant={isAuditEvidenceAvailable ? 'primary': 'secondary'}
          onClick={() => push(`evidences/${id}`)}
          type="button"
        />
      </div>
    </div>
  );
};
export default EvidenceCard;

EvidenceCard.defaultProps = {
  evidence: undefined,
  currency: undefined,
  evidenceNumber: undefined,
  isActivityAuditor: false,
};

EvidenceCard.propTypes = {
  evidence: PropTypes.objectOf(PropTypes.any),
  currency: PropTypes.string,
  evidenceNumber: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  isActivityAuditor: PropTypes.bool,
};
