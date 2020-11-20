/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Spin, Button } from 'antd';
import useQuery from '../hooks/useQuery';
import './_login.scss';
import { confirmEmail } from '../api/userApi';

function ConfirmEmail() {
  const { id } = useQuery();
  const [loading, setLoading] = useState(true);
  const [statusConfirm, setStatusConfirm] = useState(false);
  const history = useHistory();

  const goToDashboard = () => history.push('/');

  const fetchConfirmEmail = useCallback(async userId => {
    const response = await confirmEmail(userId);
    setLoading(false);
    if (response.errors) {
      return;
    }
    setStatusConfirm(true);
  });

  useEffect(() => {
    if (id) fetchConfirmEmail(id);
    else setLoading(false);
  }, [id, fetchConfirmEmail]);

  const renderForm = () => (
    <Spin spinning={loading}>
      <h1>CIRCLE OF ANGELS</h1>
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
        <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
      </div>
      <div className="FormSide">{renderForm()}</div>
    </div>
  );
}

export default ConfirmEmail;
