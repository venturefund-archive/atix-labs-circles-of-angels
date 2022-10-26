/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Popover } from 'antd';
import { CopyFilled } from '@ant-design/icons';

const CardMember = ({ member }) => {
  const { firstName, lastName, address, role } = member;

  const copyToClipboard = memberAddress => {
    navigator.clipboard.writeText(memberAddress);
  };

  const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);
  const getInitials = (name, surname) =>
    name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();

  return (
    <div className="BoxMember flex">
      <div className="TopBoxSection">
        <Avatar>{getInitials(firstName, lastName)}</Avatar>
        <div className="column">
          <p>
            <strong>{`${firstName} ${lastName}`}</strong>
          </p>
          <p>{capitalize(role)}</p>
        </div>
      </div>
      <div className="BottomBoxSection flex">
        <div className="subBox">
          <p>{address}</p>
          <Popover content="Copied" trigger="click">
            <CopyFilled onClick={() => copyToClipboard(address)} />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default CardMember;

CardMember.propTypes = {
  member: PropTypes.element.isRequired
};
