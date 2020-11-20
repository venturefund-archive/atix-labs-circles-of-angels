/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import './_style.scss';
import { getDaoUsers } from '../../../api/daoApi';
import { daoCardPropTypes } from '../../../helpers/proptypes';

const CardDao = ({ onClick, dao }) => {
  const { name, proposalsAmount, proposalsOpen, id } = dao;
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = async () => {
    try {
      const response = await getDaoUsers(id);
      if (response.errors || !response.data) {
        message.error('An error occurred while getting the Users list');
        return [];
      }
      setUsersData(response.data.users);
    } catch (error) {
      message.error(error);
    }
  };

  const renderAvatars = () => {
    const maxAvatars = 2;
    if (usersData.length < maxAvatars) {
      return (
        <div className="avatarBox flex">
          <Avatar className="avatar">U</Avatar>
        </div>
      );
    }
    return (
      <div className="avatarBox flex">
        <Avatar className="avatar-overlap">U</Avatar>
        <Avatar className="avatar">A</Avatar>
      </div>
    );
  };

  return (
    <div onClick={onClick} className="Box1 column">
      <h2>{name}</h2>
      <div className="BottomBoxSection flex space-between">
        <div className="subBox">
          <h3>Members</h3>
          <div className="detail flex">
            {renderAvatars()}
            <div className="plusSign flex-start">
              <p>... {usersData.length}</p>
            </div>
          </div>
        </div>
        <div className="subBox flex-start">
          <h3>Proposal</h3>
          <div className="detail space-between">
            <div className="detailText space-between">
              <h2>{proposalsAmount}</h2>
              <p>Total</p>
            </div>
            <div className="detailText green space-between">
              <h2>{proposalsOpen}</h2>
              <p>Open</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardDao.defaultProps = {
  onClick: () => null
};

CardDao.propTypes = {
  dao: PropTypes.shape(daoCardPropTypes).isRequired,
  onClick: PropTypes.func
};

export default CardDao;
