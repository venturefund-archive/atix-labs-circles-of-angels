/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts
 * to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Spin, Button } from 'antd';
import customConfig from 'custom-config';
import useQuery from '../hooks/useQuery';
import './_login.scss';
import { confirmEmail } from '../api/userApi';

function ConfirmEmail() {
  const { id } = useQuery();
  const [loading, setLoading] = useState(true);
  const [statusConfirm, setStatusConfirm] = useState(false);
  const history = useHistory();

  const goToDashboard = () => history.push('/');

  useEffect(() => {
    const fetchConfirmEmail = async userId => {
      const response = await confirmEmail(userId);
      setLoading(false);
      if (response.errors) {
        return;
      }
      setStatusConfirm(true);
    };

    if (id) fetchConfirmEmail(id);
    else setLoading(false);
  }, [id]);

  const renderForm = () => (
    <Spin spinning={loading}>
      <h1>{customConfig.NAME}</h1>
      <h2>
        {statusConfirm
          ? 'Your email address has been verified successfully'
          : 'An error occurred while confirming the email address'}
      </h2>
      <Button onClick={goToDashboard}>Continue</Button>
    </Spin>
  );

  return (
    <div className="Login">
      <div className="LogoSide">
        <img
          src={customConfig.SIDE_LOGO_PATH}
          alt={`${customConfig.NAME} side logo`}
        />
      </div>
      <div className="FormSide">{renderForm()}</div>
    </div>
  );
}

export default ConfirmEmail;
