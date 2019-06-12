/**
 * COA PUBLIC LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Avatar } from 'antd';
import UserLabel from '../../atoms/UserLabel/UserLabel';
import SignatureLabel from '../../atoms/SignatureLabel/SignatureLabel';
import TransferLabel from '../../atoms/TransferLabel/TransferLabel';
import './_style.scss';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import SignStatus from '../../../constants/SignStatus';
import Label from '../../atoms/Label/Label';
import Roles from '../../../constants/RolesMap';

const SignatoryItem = ({
  tfStatusName,
  tfStatusIcon,
  tfStatusShow,
  sgStatusName,
  sgStatusIcon,
  sgStatusShow,
  username,
  nameInitials,
  signStatus,
  userId,
  projectId,
  handleOk,
  loggedUser
}) => {
  const hasUser = loggedUser && loggedUser.role;
  const isFunder = hasUser && loggedUser.role.id === Roles.Funder;
  const isOwner = hasUser && userId === loggedUser.id;
  const showTransferStatus =
    (hasUser && loggedUser.role.id === Roles.SocialEntrepreneur) ||
    (isOwner && isFunder);
  const showSignButton = signStatus === SignStatus.UNSIGNED && isOwner;

  return (
    <div className="SignatoryItem">
      <Label labelText="Signer" />
      <div className="Signatory">
        <div className="SignatoryData">
          <Avatar style={{ color: '#0083E3', backgroundColor: '#95d2ff' }}>
            {nameInitials}
          </Avatar>
          <UserLabel userName={username} />
        </div>
        <div className="SignatoryStatus">
          {showTransferStatus ? (
            <TransferLabel
              text={tfStatusShow}
              theme={`theme-${tfStatusName}`}
              iconStatus={tfStatusIcon}
            />
          ) : (
            ''
          )}
          {showSignButton ? (
            <ConfirmPopUp
              userId={userId}
              projectId={projectId}
              handleOk={handleOk}
            />
          ) : (
            <SignatureLabel
              text={sgStatusShow}
              iconStatus={sgStatusIcon}
              theme={`theme-${sgStatusName}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignatoryItem;
