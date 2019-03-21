import React from 'react';
import { Avatar } from 'antd';
import UserLabel from '../../atoms/UserLabel/UserLabel';
import SignatureLabel from '../../atoms/SignatureLabel/SignatureLabel';
import './_style.scss';
import ConfirmPopUp from '../ConfirmPopUp/ConfirmPopUp';
import SignStatus from '../../../constants/SignStatus';

const SignatoryItem = ({
  tfStatusName,
  tfStatusIcon,
  tfStatusShow,
  username,
  nameInitials,
  signStatus,
  userId,
  projectId
}) => (
  <div className="SignatoryItem">
    <p className="SignatoryLabel">signer</p>
    <div className="Signatory">
      <div className="SignatoryData">
        <Avatar style={{ color: '#0083E3', backgroundColor: '#95d2ff' }}>
          {nameInitials}
        </Avatar>
        <UserLabel text={username} />
      </div>
      <div className="SignatoryStatus">
        {signStatus === SignStatus.UNSIGNED ? (
          <ConfirmPopUp userId={userId} projectId={projectId} />
        ) : (
          <SignatureLabel
            text={tfStatusShow}
            iconStatus={tfStatusIcon}
            theme={`theme-${tfStatusName}`}
          />
        )}
      </div>
    </div>
  </div>
);

export default SignatoryItem;
