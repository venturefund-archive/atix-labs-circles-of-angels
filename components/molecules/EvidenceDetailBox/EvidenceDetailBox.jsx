import React from 'react';
import PropTypes from 'prop-types';
import { CoaTag } from 'components/atoms/CoaTag/CoaTag';
import evidenceStatusMap from 'model/evidenceStatus';

export default function EvidenceDetailBox({
  title,
  description,
  createdAt,
  beneficiary,
  status,
}) {
  const date = new Date(createdAt)
  return (
    <div className='evidence-container'>
      {/* Evidence header */}
      <div className='evidence-container__header'>
        <h3 className='evidence-container__date'>
          {`${date.toLocaleDateString('en-us', { month: 'long' })}, `}
          {`${date.toLocaleDateString('en-us', { day: 'numeric' })} - `}
          {date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })}
        </h3>
        {
          status &&
          <CoaTag predefinedColor={evidenceStatusMap[status].color}>
            {
              evidenceStatusMap[status].name
            }
          </CoaTag>
        }
      </div>
      { /* Evidence indicator */}
      <h3 className='evidence-container__indicator'>EVIDENCE</h3>
      { /* Evidence title */}
      <h2 className='evidence-container__title'>
        {title}
      </h2>
      <p className='evidence-container__description'>
        {description}
      </p>
      {/* Evidence creator */}
      <h3 className='evidence-container__created-by'>
        Created by <b className='evidence-container__creator-name'>
          {beneficiary?.firstName} {beneficiary?.lastName}
        </b>
      </h3>
    </div>
  )
}

EvidenceDetailBox.defaultProps = {
  title: '',
  description: '',
  createdAt: '',
  beneficiary: {},
  status: ''
}

EvidenceDetailBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  status: PropTypes.string, 
  beneficiary: PropTypes.shape
}
