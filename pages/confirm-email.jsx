/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import useQuery from '../hooks/useQuery';
import { Spin, Button } from 'antd';
import './_login.scss';
import { confirmEmail } from '../api/userApi';
import { defaultRouteByRole } from '../constants/DefaultRouteByRole';
import { useUserContext } from '../components/utils/UserContext';

function ConfirmEmail() {
  const { id } = useQuery();
  const [loading, setLoading] = useState(true);
  const [role, setLRole] = useState();
  const [statusConfirm, setLStatusConfirm] = useState(false);
  const { changeUser } = useUserContext();
  const history = useHistory();

  const goToDashboard = () => {
    if(statusConfirm) {
      return history.push(defaultRouteByRole[role]);
    }
    return history.push('/');
  };

  const fetchConfirmEmail = useCallback(
    async userId => {
      const response = await confirmEmail(userId);
      setLoading(false);
      if (response.errors || !response.data) {
        return;
      }
      const {role} = response.data;
      setLStatusConfirm(true);
      changeUser(response.data);
      setLRole(role);
  }
  );
  
  useEffect(() => {
    if (id) fetchConfirmEmail(id); 
    else setLoading(false);
  }, [id, fetchConfirmEmail]);

  const renderForm = () => {
    return (
      <div>
          <div>
            <Spin spinning={loading}>
              <h1>CIRCLE OF ANGELS</h1>
              <h2>{statusConfirm ? 
              'Your email address has been verified successfully': 
              'An error occurred while confirm email'}</h2>
              <Button onClick={goToDashboard}>Continue</Button>
            </Spin>
          </div>
      </div>
    );
  };

  return (
    <div className="Login">
      <div className="LogoSide">
        <img src="/static/images/logo-angels.svg" alt="Circles of Angels" />
      </div>
      <div className="FormSide" >
        {renderForm()}
      </div>
    </div>
  );
}

export default ConfirmEmail;
