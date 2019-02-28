import React from 'react';
import './_style.scss';

const UserLabel = ({ text }) => (
  <div className="UserLabel">
    <h4>{text}</h4>
    <p>{text}</p>
  </div>
);

export default UserLabel;