import React from 'react';
import PropTypes from 'prop-types';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import { EVIDENCE_STATUS_MAP } from 'model/evidence';
import './_style.scss';
import { Divider } from 'antd';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { getDateAndTime } from '../../../helpers/utils';

export default function EvidenceDetailBox(props) {
  const { texts } = React.useContext(DictionaryContext);

  const { title, description, createdAt, user, status, activity } = props;
  const date = new Date(createdAt);

  const { firstName: userFirstName, lastName: userLastName } = user || {};
  const createdByName =
    userFirstName || userLastName ? `${userFirstName} ${userLastName}` : 'No name';

  const { firstName: fnAuditor, lastName: lnAuditor } = activity?.auditor || {};
  const auditorName = fnAuditor || lnAuditor ? `${fnAuditor} ${lnAuditor}` : 'No name';

  return (
    <div className="evidence-container">
      {/* Evidence header */}
      <div className="evidence-container__header">
        <h3 className="evidence-container__date">{getDateAndTime(date)}</h3>
        {status && (
          <CoaTag predefinedColor={EVIDENCE_STATUS_MAP[status].color}>
            {EVIDENCE_STATUS_MAP[status].name}
          </CoaTag>
        )}
      </div>
      <Divider style={{ marginTop: '0' }}></Divider>
      {/* Evidence indicator */}
      <h3 className="evidence-container__indicator">
        {texts?.evidenceDetail?.title || 'EVIDENCE'}
      </h3>
      {/* Evidence title */}
      <h2 className="evidence-container__title">{title}</h2>
      <p className="evidence-container__description">{description}</p>
      <div className="evidenceDetailBox__member">
        {/* Evidence creator */}
        <h3 className="evidenceDetailBox__member__Label">
          {texts?.evidenceDetail?.createdBy || 'Created by'}{' '}
          <b className="evidenceDetailBox__member__LabelValue">{createdByName}</b>
        </h3>
        {/* Auditor */}
        <h3 className="evidenceDetailBox__member__Label">
          {texts?.evidenceDetail?.auditor || 'Auditor'}:{' '}
          <b className="evidenceDetailBox__member__LabelValue">{auditorName}</b>
        </h3>
      </div>
    </div>
  );
}

EvidenceDetailBox.defaultProps = {
  title: '',
  description: '',
  createdAt: '',
  user: {},
  status: '',
  auditor: {}
};

EvidenceDetailBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  status: PropTypes.string,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }),
  auditor: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
};
