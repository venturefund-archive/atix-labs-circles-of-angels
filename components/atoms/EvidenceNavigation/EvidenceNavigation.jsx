import React from 'react';
import './_style.scss';

const EvidenceNavigation = () => (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div onClick={() => window.history.back()} className="goBackArrow">
    <img src="/static/images/arrow-back.svg" alt="back"/>
    <span>Go back</span>
  </div>
)

export default EvidenceNavigation;
