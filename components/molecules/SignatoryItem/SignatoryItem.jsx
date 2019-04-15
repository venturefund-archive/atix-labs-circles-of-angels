import React from 'react';
import { Avatar } from 'antd';
import UserLabel from '../../atoms/UserLabel/UserLabel';
import SignatureLabel from '../../atoms/SignatureLabel/SignatureLabel';
import TransferLabel from '../../atoms/TransferLabel/TransferLabel';
import './_style.scss';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import SignStatus from '../../../constants/SignStatus';

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
  loggedUserId
}) => (
  <div className="SignatoryItem">
    <p className="SignatoryLabel">signer</p>
    <div className="Signatory">
      <div className="SignatoryData">
        <Avatar style={{ color: '#0083E3', backgroundColor: '#95d2ff' }}>
          {nameInitials}
        </Avatar>
        <UserLabel userName={username} />
      </div>
      <div className="SignatoryStatus">
        <TransferLabel
          text={tfStatusShow}
          theme={`theme-${tfStatusName}`}
          iconStatus={tfStatusIcon}
        />
        {signStatus === SignStatus.UNSIGNED && userId === loggedUserId ? (
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

export default SignatoryItem;
