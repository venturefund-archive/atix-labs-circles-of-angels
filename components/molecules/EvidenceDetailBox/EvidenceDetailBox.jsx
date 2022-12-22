import React from 'react';
import PropTypes from 'prop-types';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { EVIDENCE_STATUS_MAP } from 'model/evidence';
import './_style.scss'
import { Divider } from 'antd';

export default function EvidenceDetailBox(props) {
  const { title, description, createdAt, beneficiary, status, activity } = props;
  const date = new Date(createdAt);

  const { firstName: fnBeneficiary , lastName: lnBeneficiary } = beneficiary || {};
  const beneficiaryName = fnBeneficiary || lnBeneficiary? `${fnBeneficiary} ${lnBeneficiary}`: 'No name';

  const { firstName: fnAuditor , lastName: lnAuditor } = activity?.auditor || {};
  const auditorName = fnAuditor || lnAuditor? `${fnAuditor} ${lnAuditor}`: 'No name';

  return (
    <div className="evidence-container">
      {/* Evidence header */}
      <div className="evidence-container__header">
        <h3 className="evidence-container__date">
          {`${date.toLocaleDateString('en-us', { month: 'long' })}, `}
          {`${date.toLocaleDateString('en-us', { day: 'numeric' })} - `}
          {date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })}
        </h3>
        {status && (
          <CoaTag predefinedColor={EVIDENCE_STATUS_MAP[status].color}>
            {EVIDENCE_STATUS_MAP[status].name}
          </CoaTag>
        )}
      </div>
      <Divider style={{ marginTop: '0' }}></Divider>
      {/* Evidence indicator */}
      <h3 className="evidence-container__indicator">EVIDENCE</h3>
      {/* Evidence title */}
      <h2 className="evidence-container__title">{title}</h2>
      <p className="evidence-container__description">{description}</p>
      <div className='evidenceDetailBox__member'>
        {/* Evidence creator */}
        <h3 className="evidenceDetailBox__member__Label">
        Created by{' '}
          <b className="evidenceDetailBox__member__LabelValue">
            {beneficiaryName}
          </b>
        </h3>
        {/* Auditor */}
        <h3 className="evidenceDetailBox__member__Label">
        Auditor:{' '}
          <b className="evidenceDetailBox__member__LabelValue">
            {auditorName}
          </b>
        </h3>
      </div>
    </div>
  );
}

EvidenceDetailBox.defaultProps = {
  title: '',
  description: '',
  createdAt: '',
  beneficiary: {},
  status: '',
  auditor: {},
};

EvidenceDetailBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  status: PropTypes.string,
  beneficiary: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  auditor: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  })
};
