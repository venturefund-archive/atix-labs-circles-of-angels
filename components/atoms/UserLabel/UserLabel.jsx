import React from 'react';
import './_style.scss';

const UserLabel = ({ userName, userRole }) => (
  <div className="UserLabel">
    <h4>{userName}</h4>
    <p>{userRole}</p>
  </div>
);

export default UserLabel;