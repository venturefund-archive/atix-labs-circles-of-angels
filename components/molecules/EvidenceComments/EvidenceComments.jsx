import React from 'react';
import PropTypes from 'prop-types';

export default function EvidenceComments({ reason, auditor }) {
  return (
    <div className='evidence-comments'>
      <h2 className='evidence-comments__header'>
        Auditor&apos;s Review Comments
      </h2>
      {!reason && (
        <div className='evidence-comments__no-comments'>
          <img
            className='evidence-comments__image'
            src='/static/images/no-comments.svg' alt=''
          />
          <h3 className='evidence-comments__message'>
            No activities on the blockchain yet
          </h3>
        </div>
      )}
      {reason && (
        <div className='evidence-comments__reason'>
          <img src='/static/images/audit-comment.svg' alt=''/>
          <div className='evidence-comments__commentary'>
            <div className='evidence-comments__top'>
              <h3 className='evidence-comments__auditor-name'>
                {auditor?.firstName} {auditor?.lastName}
              </h3>
              {/* Await for commentary date integration
              <h3 className='evidence-comments__date'>
                25/09/2022
              </h3>
                */}
            </div>
            <p className='evidence-comments__text'>
              {reason}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

EvidenceComments.defaultProps = {
  reason: null,
  auditor: {}
}

EvidenceComments.propTypes = {
  reason: PropTypes.string,
  auditor: PropTypes.shape
}
